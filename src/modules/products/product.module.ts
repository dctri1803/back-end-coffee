import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Product } from "src/database/entities/products.entity";
import { ProductServices } from "./services/products.service";
import { ProductController } from "./controllers/products.controller";
import { ReviewServices } from "./services/review.service";
import { ReviewController } from "./controllers/products-reviews.controller";
import { ProductReview } from "src/database/entities/product-reviews.entity";
import { ProductImage } from "src/database/entities/product-images.entity";
import { Franchise } from "src/database/entities/franchises.entity";
import { User } from "src/database/entities/user.entity";
import { ProductCategory } from "src/database/entities/product-category.entity";
import { ProductSize } from "src/database/entities/product-sizes.entity";

@Module({
    imports: [TypeOrmModule.forFeature([Product, ProductReview, ProductImage, Franchise, User, ProductCategory, ProductSize])],
    providers: [ProductServices, ReviewServices],
    controllers: [ProductController, ReviewController],
    exports: [ProductServices]
})
export class ProductModules { }