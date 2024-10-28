import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Product } from "./products.entity";
import { CartItem } from "./cart-item.entity";

@Entity('product_sizes')
export class ProductSize {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'enum', enum: ['M', 'L', 'XL'], default: 'M' })
    size: 'M' | 'L' | 'XL';

    @Column({ type: 'decimal', precision: 10, scale: 2, default: 0 })
    price_adjustment: number;

    @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    created_at: Date;

    @UpdateDateColumn({
        type: 'timestamp',
        default: () => 'CURRENT_TIMESTAMP',
        onUpdate: 'CURRENT_TIMESTAMP',
    })
    updated_at: Date;

    @OneToMany(() => CartItem, (cartItem) => cartItem.product)
    cartItems: CartItem[];
    
}