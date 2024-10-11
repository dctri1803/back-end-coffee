export class ReviewsDto {
    user_id: number;
    product_id: number;
    rating: number;
    comment: string;
    parent_review_id?: number
}