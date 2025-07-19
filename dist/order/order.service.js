"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrdersService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const ioredis_1 = require("ioredis");
const microservices_1 = require("@nestjs/microservices");
const common_2 = require("@nestjs/common");
const uuid_1 = require("uuid");
let OrdersService = class OrdersService {
    constructor(configService) {
        this.configService = configService;
        this.redis = new ioredis_1.Redis({
            host: this.configService.get('REDIS_HOST'),
            port: this.configService.get('REDIS_PORT'),
        });
        this.rabbitmq = microservices_1.ClientProxyFactory.create({
            transport: microservices_1.Transport.RMQ,
            options: {
                urls: [this.configService.get('RABBITMQ_URL')],
                queue: 'order_queue',
                queueOptions: { durable: true },
            },
        });
    }
    async createOrder(userId, payload) {
        const orderId = (0, uuid_1.v4)();
        const order = Object.assign(Object.assign({ id: orderId, userId }, payload), { createdAt: new Date() });
        await this.redis.set(`order:${orderId}`, JSON.stringify(order));
        await this.rabbitmq.emit('order.created', order).toPromise();
        return orderId;
    }
    async getOrder(orderId) {
        const order = await this.redis.get(`order:${orderId}`);
        if (!order)
            throw new common_2.BadRequestException('Order not found');
        return JSON.parse(order);
    }
};
exports.OrdersService = OrdersService;
exports.OrdersService = OrdersService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService])
], OrdersService);
//# sourceMappingURL=order.service.js.map