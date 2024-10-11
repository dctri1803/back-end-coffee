import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Franchise } from "./franchises.entity";
import { ProductReview } from "./product_reviews.entity";
import { ProductImage } from "./product_images.entity";
import { ProductCategory } from "./product_category.entity";
// import { CartItem } from "./cart-item.entity";

@Entity('products')
export class Product {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    franchise_id: number;

    @CreateDateColumn()
    created_at: Date;

    @CreateDateColumn()
    updated_at: Date;

    @Column()
    name: string;

    @Column()
    price: number;

    @Column()
    description: string;

    @Column({ default: 0 })
    quantity_sold: number;

    @ManyToOne(() => Franchise, franchise => franchise.product, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'franchise_id' })
    franchise: Franchise;

    @OneToMany(() => ProductReview, (review) => review.product )
    review: ProductReview[];

    @OneToMany(() => ProductImage, (productImage) => productImage.product )
    productImages: ProductImage[];

    @OneToMany(() => ProductCategory, (productCategory) => productCategory.product )
    productCategories: ProductCategory[];

//     @OneToMany(() => CartItem, (cartItem) => cartItem.product)
//     cartItems: CartItem[];
}