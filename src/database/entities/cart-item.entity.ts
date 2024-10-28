import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn, UpdateDateColumn, JoinColumn, ManyToMany, JoinTable } from 'typeorm';
import { Cart } from './cart.entity';
import { Product } from './products.entity';
import { ProductSize } from './product-sizes.entity';
import { Topping } from './topping.entity';

@Entity('cart_items')
export class CartItem {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    cart_id: number;

    @Column()
    product_id: number;

    @Column()
    size_id: number;

    @Column('decimal', { precision: 10, scale: 2 })
    total_price: number;

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

    @ManyToOne(() => ProductSize, { onDelete: "SET NULL" })
    @JoinColumn({ name: "size_id" })
    size: ProductSize;

    @ManyToMany(() => Topping)
    @JoinTable({
    name: 'cart_item_toppings',
    joinColumn: { name: 'cart_item_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'topping_id', referencedColumnName: 'id' },
    })
    toppings: Topping[];
}
