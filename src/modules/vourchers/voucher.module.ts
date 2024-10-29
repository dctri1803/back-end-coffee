import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Voucher } from "src/database/entities/voucher.entity";
import { VoucherService } from "./services/voucher.service";
import { VoucherController } from "./controllers/voucher.controller";

@Module({
    imports: [TypeOrmModule.forFeature([Voucher])],
    providers: [VoucherService],
    controllers: [VoucherController],
    exports: [VoucherService]
})
export class VoucherModules {}