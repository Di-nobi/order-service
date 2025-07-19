import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Redis } from 'ioredis';
import { ClientProxyFactory, Transport, ClientProxy } from '@nestjs/microservices';
import { CreateDto } from '../dtos/order.dto';
import { BadRequestException } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class OrdersService {
  private readonly redis: Redis;
  private readonly rabbitmq: ClientProxy;

  constructor(private readonly configService: ConfigService) {
    this.redis = new Redis({
      host: this.configService.get<string>('REDIS_HOST'),
      port: this.configService.get<number>('REDIS_PORT'),
    });
    this.rabbitmq = ClientProxyFactory.create({
      transport: Transport.RMQ,
      options: {
        urls: [this.configService.get<string>('RABBITMQ_URL')],
        queue: 'order_queue',
        queueOptions: { durable: true },
      },
    } as any);
  }

  async createOrder(userId: string, payload: CreateDto): Promise<string> {
    const orderId = uuidv4();
    const order = { id: orderId, userId, ...payload, createdAt: new Date() };
    
    await this.redis.set(`order:${orderId}`, JSON.stringify(order));
    await this.rabbitmq.emit('order.created', order).toPromise();
    
    return orderId;
  }

  async getOrder(orderId: string): Promise<any> {
    const order = await this.redis.get(`order:${orderId}`);
    if (!order) throw new BadRequestException('Order not found');
    return JSON.parse(order);
  }
}