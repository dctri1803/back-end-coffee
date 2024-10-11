import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post } from "@nestjs/common";
import { ReviewServices } from "../services/review.service";
import { ReviewsDto } from "../dto/review.dto";
import { UpdateReviewDto } from "../dto/update-review.dto";
import { CurrentUser } from "src/modules/users/decorators/current-user.decorator";
import { User } from "src/database/entities/user.entity";

@Controller('reviews')
export class ReviewController {
    constructor(private reviewServices: ReviewServices)
    {}

    @Get(':id')
    async findAll(@Param('productId', ParseIntPipe) productId: number) {
        return await this.reviewServices.findAll(productId)
    }

    @Post()
    async createReview(@Body() createReview: ReviewsDto,
    @CurrentUser() currentUser: User,){
        return await this.reviewServices.createReview(createReview, currentUser)
    }

    @Patch(':id')
    async updateReview(
        @Param('id', ParseIntPipe) id:number,
        @Body() updateReview: UpdateReviewDto
    ) {
        return await this.reviewServices.updateReview(id, updateReview)
    }

    @Delete(':id')
    async deleteReview(@Param('id', ParseIntPipe) id:number) {
        return await this.reviewServices.deleteReview(id)
    }

}