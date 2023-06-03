import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { OrderItem } from './OrderItem.entity';

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ nullable: false })
  name: string;
  @Column()
  description: string;
  @Column()
  price: string;
  @Column()
  discountedPrice: string;

  @Column()
  quantity: string;

  //   @ManyToOne(() => OrderItem, (orderItem) => orderItem.product)
  //   orderItem: OrderItem;

  @OneToMany(() => OrderItem, (orderItem) => orderItem.product)
  orderItem: OrderItem[];
}
