import { ClassSerializerInterceptor, UseInterceptors } from '@nestjs/common';
import { Exclude, Expose } from 'class-transformer';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { OrderItem } from './order-item';

@Entity('orders')
export class Order {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  transaction_id: string;

  @Column()
  user_id: number;

  @Column({ nullable: true })
  order: string;

  @Column()
  ambassador_email: string;

  @Column()
  @Exclude()
  first_name: string;

  @Column()
  @Exclude()
  last_name: string;

  @Column()
  email: string;

  @Column({ nullable: true })
  address: string;

  @Column({ nullable: true })
  country: string;

  @Column({ nullable: true })
  city: string;

  @Column({ nullable: true })
  zip: string;

  @Exclude()
  @Column({ default: false })
  complete: boolean;

  @OneToMany(() => OrderItem, (orderItem) => orderItem.order)
  order_items: OrderItem[];

  @Expose()
  get name() {
    return `${this.first_name} ${this.last_name}`;
  }

  @Expose()
  get total() {
    return this.order_items.reduce(
      (s: number, i: OrderItem) => s + i.admin_revenue,
      0,
    );
  }
}
