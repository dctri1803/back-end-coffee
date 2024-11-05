import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Order } from "./order.entity";
import { Product } from "./products.entity";
import { ProductSize } from "./product-sizes.entity";

@Entity('order_items')
export class OrderItem {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    order_id: number;

    @Column()
    product_id: number;

    @Column()
    size_id: number;

    @Column()
    quantity: number;

    @Column({ type: 'decimal', precision: 10, scale: 2, default: 0 })
    total_price: number;

    @ManyToOne(() => Order, order => order.orderItems)
    @JoinColumn({ name: 'order_id' })
    order: Order;

    @ManyToOne(() => Product, product => product.orderItems)
    @JoinColumn({ name: 'product_id' })
    product: Product;

    @ManyToOne(() => ProductSize, size => size.orderItems)
    @JoinColumn({ name: 'size_id' })
    size: ProductSize;
}