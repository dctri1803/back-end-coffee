import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Product } from "./products.entity";

@Entity('product_images')
export class ProductImage {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'varchar', length: 255, nullable: true })
    image_url: string;

    @Column({ type: 'int', nullable: true })
    product_id: number;

    @CreateDateColumn({ type: 'timestamp' })
    created_at: Date;

    @UpdateDateColumn({ type: 'timestamp' })
    updated_at: Date;

    // Relationship
    @ManyToOne(() => Product, (product) => product.productImages, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'product_id' }) // Explicitly map the product_id to the relation
    product: Product;
}