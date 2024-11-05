import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./user.entity";
import { Product } from "./products.entity";
import { Order } from "./order.entity";

@Entity('franchises')
export class Franchise {
    @PrimaryGeneratedColumn()
    id: number;

    @CreateDateColumn()
    created_at: Date;

    @CreateDateColumn()
    updated_at: Date;

    @Column()
    name: string;

    @Column()
    address: string;

    @Column()
    phone_number: string;

    @Column()
    owner_id: number;

    @ManyToOne(() => User, (user) => user.franchise, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'owner_id' }) // Maps 'owner_id' column to the User entity
    owner: User;

    @OneToMany(() => Order, (order) => order.franchise)
    orders: Order[]
}