import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
    JoinColumn,
    CreateDateColumn,
    UpdateDateColumn,
    OneToMany,
} from 'typeorm';
import { User } from './user.entity';
import { Product } from './products.entity';


@Entity('product_reviews')
export class ProductReview {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    user_id: number;

    @Column()
    product_id: number;

    @Column({ nullable: true })
    parent_review_id: number;

    @Column({ type: 'int', width: 1 })
    rating: number;

    @Column({ type: 'text', nullable: true })
    comment: string;

    @CreateDateColumn({ type: 'timestamp' })
    created_at: Date;

    @UpdateDateColumn({ type: 'timestamp' })
    updated_at: Date;

    // Relationships
    @ManyToOne(() => User, (user) => user.review, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'user_id' })
    user: User;

    @ManyToOne(() => Product, (product) => product.review, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'product_id' })
    product: Product;

    @ManyToOne(() => ProductReview, (review) => review.replies, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'parent_review_id' })
    parentReview: ProductReview;

    @OneToMany(() => ProductReview, (review) => review.parentReview)
    replies: ProductReview[];
}
