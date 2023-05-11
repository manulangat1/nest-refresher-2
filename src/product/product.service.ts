import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from 'src/database/entities/Product.entity';
import { Repository } from 'typeorm';
import { CreateProduct } from './dto';
import { OrderItem } from 'src/database/entities/OrderItem.entity';
import { Order } from 'src/database/entities/Order.entity';
import { User } from 'src/database/entities/User.entity';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product) private producctRepository: Repository<Product>,
    @InjectRepository(OrderItem) private OrderItemRepo: Repository<OrderItem>,
    @InjectRepository(Order) private OrderRepo: Repository<Order>,
  ) {}
  async getAllProducts(): Promise<Product[]> {
    return this.producctRepository.find();
  }
  async create(dto: CreateProduct): Promise<Product> {
    const product = await this.producctRepository.create({ ...dto });
    return this.producctRepository.save(product);
  }

  async getActiveOrder(user): Promise<Order> {
    const orders = await this.OrderRepo.findOne({
      where: {
        user: user,
        isActive: true,
      },
    });
    return orders;
  }

  async getProductById(id) {
    return await this.producctRepository.find({
      where: {
        id: id,
      },
    });
  }
  async createOrder(user) {
    const new_order = await this.OrderRepo.create({
      user: user,
      isActive: true,
    });
    const order = await this.OrderRepo.save(new_order);
    return order;
  }

  async getOrderItem(product, order) {
    return await this.OrderItemRepo.find({
      where: {
        product: product[0],
        order: order,
      },
    });
  }
  async createOrderItem(order, product, price) {
    const new_order_item = await this.OrderItemRepo.create({
      order: order,
      product: product,
      price: parseInt(price),
    });
    return await this.OrderItemRepo.save(new_order_item);
  }
  async addToOrder(id: number, user: User) {
    const product = await this.getProductById(id);
    console.log(product);
    if (product.length < 1) {
      throw new HttpException('Product not found', 404);
    }
    const orderExists = await this.getActiveOrder(user);
    console.log(orderExists);
    if (!orderExists) {
      await this.createOrder(user);
    }

    const orderItem = await this.getOrderItem(product[0], orderExists);
    console.log('my order item', orderItem);
    if (orderItem.length < 1) {
      const saved_order_item = await this.createOrderItem(
        orderExists[0],
        product,
        product[0].price,
      );

      console.log('Newly created', saved_order_item);
    } else {
      orderItem[0].quantity += 1;
      orderItem[0].price = orderItem[0].quantity * parseInt(product[0].price);
      await this.OrderItemRepo.save(orderItem);
      console.log('updated', orderItem);
    }

    return 'hello';
  }
}
