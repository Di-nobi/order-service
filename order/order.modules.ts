import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { JwtHelper } from '../helper/jwt.helper';
import { JwtGuard } from '../guard/jwt.guard';
import { ApiKeyGuard } from '../guard/apiKey.guard';
import { OrdersService } from './order.service';
import { OrdersController } from './order.controller';
import { HttpModule } from '@nestjs/axios';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    ConfigModule,
    HttpModule,
    ClientsModule.registerAsync([
      {
        name: 'RABBITMQ_SERVICE',
        imports: [ConfigModule],
        useFactory: async (configService: ConfigService) => ({
          transport: Transport.RMQ,
          options: {
            urls: [configService.get<string>('RABBITMQ_URL')],
            queue: 'order_queue',
            queueOptions: { durable: true },
          },
        } as any),
        inject: [ConfigService],
      },
    ]),
    
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
        signOptions: { expiresIn: '1h' },
      }),
      inject: [ConfigService],
    })
  ],
  controllers: [OrdersController],
  providers: [ OrdersService, JwtHelper, ApiKeyGuard, JwtGuard]
})
export class OrderModule {}