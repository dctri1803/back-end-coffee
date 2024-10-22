import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn, UpdateDateColumn, JoinColumn } from 'typeorm';
import { Cart } from './cart.entity';
import { Product } from './products.entity';

@Entity('cart_items')
export class CartItem {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    cart_id: number;

    @Column()
    product_id: number;

    @Column()
    quantity: number;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

    @ManyToOne(() => Cart, (cart) => cart.cartItems, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'cart_id' })
    cart: Cart;

    @ManyToOne(() => Product, (product) => product.cartItems, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'product_id' })
    product: Product;
}
