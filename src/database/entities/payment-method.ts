// import { Column, Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from "typeorm";
// import { User } from "./user.entity";

// @Entity('payment_methods')
// export class PaymentMethod {
//     @PrimaryGeneratedColumn()
//     payment_method_id: number;

//     @Column({ type: 'enum', enum: ['credit_card', 'e_wallet', 'cash_on_delivery'] })
//     method_type: string;

//     @Column({ length: 100, nullable: true })
//     provider_name: string;

//     @Column({ length: 100, nullable: true })
//     account_number: string;

//     @Column({ type: 'date', nullable: true })
//     expired_date: Date;

//     @ManyToOne(() => User, (user) => user.paymentMethods, { onDelete: 'CASCADE' })
//     @JoinColumn({ name: 'user_id' })
//     user: User;
// }
