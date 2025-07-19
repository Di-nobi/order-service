// app.module.ts
import { Module } from '@nestjs/common';
import { OrderModule } from './order/order.modules'

@Module({
  imports: [OrderModule],
})
export class AppModule {}