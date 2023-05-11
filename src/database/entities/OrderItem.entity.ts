import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Product } from './Product.entity';
import { Order } from './Order.entity';

@Entity()
export class OrderItem {
  @PrimaryGeneratedColumn()
  id: number;

  //   @OneToMany(() => Product, (product) => product.orderItem)
  //   product: Product[];

  @ManyToMany(() => Product)
  @JoinTable()
  product: Product[];
  @Column({ default: 1 })
  quantity: number;

  @Column()
  price: number;

  @ManyToOne(() => Order, (order) => order.orderItems)
  order: Order;
}
