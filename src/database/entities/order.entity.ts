// import { Column, Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn, CreateDateColumn, UpdateDateColumn } from "typeorm";
// import { User } from "./user.entity";
// import { PaymentMethod } from "./payment-method";
// import { Franchise } from "./franchises.entity";

// @Entity('orders')
// export class Order {
//     @PrimaryGeneratedColumn()
//     id: number;

//     @Column()
//     user_id: number;
//     @ManyToOne(() => User)
//     @JoinColumn({ name: 'user_id' })
//     user: User;

//     @Column()
//     payment_method_id: number
//     @ManyToOne(() => PaymentMethod)
//     @JoinColumn({ name: 'payment_method_id' })
//     paymentMethod: PaymentMethod;

//     @Column()
//     managed_by: number
//     @ManyToOne(() => User)
//     @JoinColumn({ name: 'managed_by' })
//     managedBy: User;

//     @Column({ length: 255, nullable: true })
//     buyer_name: string;

//     @Column({ length: 20, nullable: true })
//     buyer_phone: string;

//     @Column({ length: 100, nullable: true })
//     buyer_email: string;

//     @Column()
//     franchise_id: number
//     @ManyToOne(() => Franchise)
//     @JoinColumn({ name: 'franchise_id' })
//     franchise: Franchise;

//     @Column({ type: 'enum', enum: ['pending', 'completed', 'cancelled'], default: 'pending' })
//     status: string;

//     @CreateDateColumn()
//     created_at: Date;

//     @UpdateDateColumn()
//     updated_at: Date;
// }
