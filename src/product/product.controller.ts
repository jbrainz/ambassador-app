import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ProductCreateDto } from './dtos/product.create.dto';
import { ProductService } from './product.service';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get('admin/products')
  async all() {
    return this.productService.find({});
  }

  @Post('admin/products')
  async create(@Body() body: ProductCreateDto) {
    return this.productService.save(body);
  }

  @Post('admin/products/:id')
  async get(@Param('id') id: number) {
    return this.productService.findOne({ id });
  }
  @Put('admin/products/:id')
  async update(@Param('id') id: number, @Body() body: ProductCreateDto) {
    await this.productService.update(id, body);
    return this.productService.findOne({ id });
  }
  @Delete('admin/product/:id')
  async delete(@Param('id') id: number) {
    return this.productService.delete(id);
  }
}
