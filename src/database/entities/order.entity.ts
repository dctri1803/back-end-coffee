import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { OrderItem } from "./order-item.entity";
import { User } from "./user.entity";
import { Franchise } from "./franchises.entity";
import { PaymentMethod } from "./payment-method";

@Entity('orders')
export class Order {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    user_id: number;

    @Column()
    franchise_id: number;

    @Column()
    payment_method_id: number;

    @Column({ type: 'decimal', precision: 10, scale: 2, default: 0 })
    total_price: number;

    @Column()
    address: string;

    @Column()
    phone_number: string;

    @Column()
    customer_name: string;

    @Column({ type: 'enum', enum: ['pending', 'confirmed', 'shipped', 'completed', 'cancelled'], default: 'pending' })
    status: string;

    @OneToMany(() => OrderItem, orderItem => orderItem.order)
    orderItems: OrderItem[];

    @ManyToOne(() => User, user => user.orders)
    @JoinColumn({ name: 'user_id' })
    customer: User;

    @ManyToOne(() => Franchise, franchise => franchise.orders)
    @JoinColumn({ name: 'franchise_id' })
    franchise: Franchise;

    @ManyToOne(() => PaymentMethod, paymentMethod => paymentMethod.orders)
    @JoinColumn({ name: 'payment_method_id' })
    paymentMethod: PaymentMethod;
}