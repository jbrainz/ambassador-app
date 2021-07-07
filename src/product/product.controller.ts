import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { AuthGaurd } from 'src/auth/auth.gaurd';
import { ProductCreateDto } from './dtos/product.create.dto';
import { ProductService } from './product.service';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @UseGuards(AuthGaurd)
  @Get('admin/products')
  async all() {
    return this.productService.find();
  }

  @UseGuards(AuthGaurd)
  @Post('admin/products')
  async create(@Body() body: ProductCreateDto) {
    return this.productService.save(body);
  }

  @UseGuards(AuthGaurd)
  @Post('admin/products/:id')
  async get(@Param('id') id: number) {
    return this.productService.findOne({ id });
  }
  @UseGuards(AuthGaurd)
  @Put('admin/products/:id')
  async update(@Param('id') id: number, @Body() body: ProductCreateDto) {
    await this.productService.update(id, body);
    return this.productService.findOne({ id });
  }
  @UseGuards(AuthGaurd)
  @Delete('admin/product/:id')
  async delete(@Param('id') id: number) {
    return this.productService.delete(id);
  }
}
