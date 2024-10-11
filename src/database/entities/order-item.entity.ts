// import { Column, Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from "typeorm";
// // import { Order } from "./order.entity";
// import { Product } from "./products.entity";

// @Entity('order_items')
// export class OrderItem {
//     @PrimaryGeneratedColumn()
//     id: number;

//     @Column()
//     order_id: number
//     @ManyToOne(() => Order, { onDelete: 'CASCADE' })
//     @JoinColumn({ name: 'order_id' })
//     order: Order;

//     @Column()
//     product_id: number
//     @ManyToOne(() => Product, { onDelete: 'CASCADE' })
//     @JoinColumn({ name: 'product_id' })
//     product: Product;

//     @Column({ type: 'enum', enum: ['S', 'M', 'L'] })
//     size: string;

//     @Column({ type: 'int' })
//     quantity: number;

//     @Column({ type: 'decimal', precision: 10, scale: 2 })
//     price: number;

//     @Column({ type: 'enum', enum: ['pending', 'completed', 'cancelled'], default: 'pending' })
//     status: string;
// }