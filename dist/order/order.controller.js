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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrdersController = void 0;
const common_1 = require("@nestjs/common");
const order_service_1 = require("./order.service");
const order_dto_1 = require("../dtos/order.dto");
const swagger_1 = require("@nestjs/swagger");
const apiKey_guard_1 = require("../guard/apiKey.guard");
const jwt_guard_1 = require("../guard/jwt.guard");
let OrdersController = class OrdersController {
    constructor(ordersService) {
        this.ordersService = ordersService;
    }
    async createOrder(body, req) {
        const userId = req.user.id;
        const orderId = await this.ordersService.createOrder(userId, body);
        return { success: true, message: 'Order created', data: { orderId } };
    }
    async getOrder(id) {
        const order = await this.ordersService.getOrder(id);
        return { success: true, message: 'Order retrieved', data: order };
    }
};
exports.OrdersController = OrdersController;
__decorate([
    (0, common_1.Post)("create"),
    (0, swagger_1.ApiOperation)({ summary: 'Create a new order' }),
    (0, common_1.HttpCode)(201),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [order_dto_1.CreateDto, Object]),
    __metadata("design:returntype", Promise)
], OrdersController.prototype, "createOrder", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Get an order by ID' }),
    (0, common_1.HttpCode)(200),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], OrdersController.prototype, "getOrder", null);
exports.OrdersController = OrdersController = __decorate([
    (0, common_1.Controller)('orders'),
    (0, swagger_1.ApiTags)('orders'),
    (0, swagger_1.ApiSecurity)('Api-Key'),
    (0, swagger_1.ApiBearerAuth)('JWT'),
    (0, common_1.UseGuards)(apiKey_guard_1.ApiKeyGuard, jwt_guard_1.JwtGuard),
    __metadata("design:paramtypes", [order_service_1.OrdersService])
], OrdersController);
//# sourceMappingURL=order.controller.js.map