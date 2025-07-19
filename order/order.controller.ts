// src/orders/orders.controller.ts
import { Controller, Post, Request, Body, Get, Param, UseGuards, HttpCode } from '@nestjs/common';
import { OrdersService } from './order.service';
import { CreateDto } from '../dtos/order.dto';
import { ApiOperation, ApiTags, ApiSecurity, ApiBearerAuth } from '@nestjs/swagger';
import { ApiKeyGuard } from '../guard/apiKey.guard'
import { JwtGuard} from '../guard/jwt.guard';


@Controller('orders')
@ApiTags('orders')
@ApiSecurity('Api-Key')
@ApiBearerAuth('JWT')
@UseGuards(ApiKeyGuard, JwtGuard)
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post("create")
  @ApiOperation({ summary: 'Create a new order' })
  @HttpCode(201)
  async createOrder(@Body() body: CreateDto, @Request() req: any) {
    const userId = req.user.id; // From JWT payload
    const orderId = await this.ordersService.createOrder(userId, body);
    return { success: true, message: 'Order created', data: { orderId } };
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get an order by ID' })
  @HttpCode(200)
  async getOrder(@Param('id') id: string) {
    const order = await this.ordersService.getOrder(id);
    return { success: true, message: 'Order retrieved', data: order };
  }
}