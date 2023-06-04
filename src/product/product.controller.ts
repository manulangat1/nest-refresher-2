import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';
import { ProductService } from './product.service';
// import { Public } from 'src/auth/decorators/public.decorator';
import { CreateProduct } from './dto';
// import { GetUser } from 'src/auth/decorators/get.user.decorator';
// import { User } from 'src/database/entities/User.entity';
// import { Product } from 'src/database/entities/Product.entity';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { Product } from '../database/entities/Product.entity';
import { GetUser } from '../auth/decorators/get.user.decorator';
import { User } from '../database/entities/User.entity';
import { Public } from '../auth/decorators/public.decorator';

@ApiTags('product')
@Controller('product')
export class ProductController {
  constructor(private productService: ProductService) {}

  @Public()
  @Get()
  @HttpCode(HttpStatus.OK)
  @ApiResponse({
    description: 'Fetch list of all products',
    type: Product,
  })
  async getAll(): Promise<Product[]> {
    return this.productService.getAllProducts();
  }

  @Post()
  @Public()
  async create(@Body() dto: CreateProduct): Promise<Product> {
    return this.productService.create(dto);
  }

  @Put(':id')
  // @Public()
  async addToOrder(
    @Param('id', ParseIntPipe) id: number,
    @GetUser() user: User,
  ) {
    return this.productService.addToOrder(id, user);
  }

  @Get('order')
  async getOrders(@GetUser() user: User) {
    return this.productService.getActiveOrder(user);
  }
}
