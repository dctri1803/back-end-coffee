// import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, CreateDateColumn, UpdateDateColumn } from 'typeorm';
// import { User } from './user.entity';
// import { CartItem } from './cart-item.entity';

// @Entity('carts')
// export class Cart {
//     @PrimaryGeneratedColumn()
//     id: number;

//     @Column()
//     user_id: number;

//     @CreateDateColumn()
//     created_at: Date;

//     @UpdateDateColumn()
//     updated_at: Date;

//     @ManyToOne(() => User, (user) => user.carts, { onDelete: 'CASCADE' })
//     user: User;

//     @OneToMany(() => CartItem, (cartItem) => cartItem.cart, { cascade: true })
//     cartItems: CartItem[];
// }
