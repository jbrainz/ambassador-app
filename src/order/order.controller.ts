import {
  ClassSerializerInterceptor,
  Controller,
  Get,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { AuthGaurd } from 'src/auth/auth.gaurd';
import { OrderService } from './order.service';

@UseGuards(AuthGaurd)
@Controller('order')
export class OrderController {
  constructor(private orderService: OrderService) {}

  @UseInterceptors(ClassSerializerInterceptor)
  @Get('admin/orders')
  all() {
    return this.orderService.find({
      relations: ['order_items'],
    });
  }
}
