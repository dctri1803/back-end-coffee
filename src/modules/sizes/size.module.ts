import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ProductSize } from "src/database/entities/product-sizes.entity";
import { SizeController } from "./controller/sizes.controller";
import { SizeServices } from "./services/sizes.service";

@Module({
    imports: [TypeOrmModule.forFeature([ProductSize])],
    controllers: [SizeController],
    providers: [SizeServices]
})
export class SizeModules {}