import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Topping } from "src/database/entities/topping.entity";
import { ToppingService } from "./services/topping.service";
import { ToppingController } from "./controllers/toppping.controller";

@Module({
    imports: [TypeOrmModule.forFeature([Topping])],
    providers: [ToppingService],
    controllers: [ToppingController],
    exports: [ToppingService]
})
export class ToppingModules {}