import { Module } from '@nestjs/common';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from 'src/database/entities/Product.entity';
import { OrderItem } from 'src/database/entities/OrderItem.entity';
import { Order } from 'src/database/entities/Order.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Product, OrderItem, Order])],
  controllers: [ProductController],
  providers: [ProductService],
})
export class ProductModule {}
