import { BadRequestException, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { ProductReview } from "src/database/entities/product_reviews.entity";
import { Product } from "src/database/entities/products.entity";
import { User } from "src/database/entities/user.entity";
import { Repository } from "typeorm";
import { ReviewsDto } from "../dto/review.dto";
import { UpdateReviewDto } from "../dto/update-review.dto";

@Injectable()
export class ReviewServices {
    constructor(
        @InjectRepository(ProductReview)
        private reviewRepository: Repository<ProductReview>,
        @InjectRepository(Product)
        private productRepository: Repository<Product>,
    ){}

    findAll(productId: number): Promise<ProductReview[]> {
        return this.reviewRepository.find({
            where: { product_id: productId },
            relations: ['user', 'product', 'replies'],
        }
        )
    }

    async createReview(createReview: ReviewsDto,    user: User,
    ): Promise<ProductReview> {
        const product = await this.productRepository.existsBy({
            id: createReview.product_id
        });
        if (!product) {
            throw new BadRequestException(`Product with ID ${createReview.product_id} not found`);
        }

        let parentReview = null;
        if (createReview.parent_review_id) {
            parentReview = await this.reviewRepository.existsBy({
                parent_review_id: createReview.parent_review_id
            });
            if (!parentReview) {
                throw new BadRequestException(`Parent review with ID ${createReview.parent_review_id} not found`);
            }
        }

        const review = this.reviewRepository.create({
            user_id: user.id,
            product_id: createReview.product_id,
            rating: createReview.rating,
            comment: createReview.comment,
            parent_review_id: createReview.parent_review_id,
        });

        return await this.reviewRepository.save(review);
    }

    // Update an existing review or comment
    async updateReview(id: number, updateReview: UpdateReviewDto): Promise<ProductReview> {
        const review = await this.reviewRepository.findOneBy({
            id: id
        });
        if (!review) {
            throw new BadRequestException(`Review with ID ${id} not found`);
        }

        review.rating = updateReview.rating;
        review.comment = updateReview.comment;

        return await this.reviewRepository.save(review);
    }

    // Delete a review or comment
    async deleteReview(reviewId: number): Promise<void> {
        const review = await this.reviewRepository.findOneBy({
            id:reviewId
        });
        if (!review) {
            throw new BadRequestException(`Review with ID ${reviewId} not found`);
        }

        await this.reviewRepository.remove(review);
    }
}