import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
// import { Product } from 'src/database/entities/Product.entity';
import { Repository } from 'typeorm';
import { CreateProduct } from './dto';
// import { OrderItem } from 'src/database/entities/OrderItem.entity';
// import { Order } from 'src/database/entities/Order.entity';
// import { User } from 'src/database/entities/User.entity';
import { Product } from '../database/entities/Product.entity';
import { OrderItem } from '../database/entities/OrderItem.entity';
import { Order } from '../database/entities/Order.entity';
import { User } from '../database/entities/User.entity';

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
      relations: ['orderItems', 'orderItems.product'],
    });
    return orders;
  }

  async getProductById(id) {
    const product = await this.producctRepository.find({
      where: {
        id: id,
      },
    });
    if (!product) {
      throw new HttpException('Product not found', 404);
    }
    return product;
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
        product: product,
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

    if (product.length < 1) {
      throw new HttpException('Product not found', 404);
    }

    const orderExists = await this.getActiveOrder(user);

    console.log(orderExists, ' my order exists');

    if (!orderExists) {
      const new_order = await this.createOrder(user);
      console.log(new_order, 'my newly created order');
      const orderItem = await this.getOrderItem(product[0], new_order);
      console.log(orderItem, 'my order item');
      const saved_order_item = await this.createOrderItem(
        new_order,
        product[0],
        product[0].price,
      );

      console.log('Newly created', saved_order_item);
      console.log('Newly created');

      console.log('new_order', new_order);
      //   console.log('new_order', new_order);
      new_order.total_price += parseInt(product[0].price);
      await this.OrderRepo.save(new_order);
      return new_order;
    }
    const orderItem = await this.getOrderItem(product[0], orderExists);

    console.log(orderItem, ' my orderItem outside', orderItem.length < 1);

    if (orderItem.length < 1) {
      const saved_order_item = await this.createOrderItem(
        orderExists,
        product[0],
        product[0].price,
      );

      console.log('Newly created', saved_order_item);
      orderExists.total_price += parseInt(product[0].price);
      await this.OrderRepo.save(orderExists);
    } else {
      orderItem[0].quantity += 1;
      orderItem[0].price = orderItem[0].quantity * parseInt(product[0].price);
      await this.OrderItemRepo.save(orderItem);

      // increase the price
      orderExists.total_price += parseInt(product[0].price);
      await this.OrderRepo.save(orderExists);
      console.log('updated', orderItem);
    }

    return orderExists;
  }
}
