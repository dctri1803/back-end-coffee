import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Voucher } from "src/database/entities/voucher.entity";
import { Repository } from "typeorm";
import { CreateVoucherDto } from "../dto/create-voucher.dto";
import { ApplyVoucherDto } from "../dto/apply-voucher.dto";

@Injectable()
export class VoucherService {
    constructor(
        @InjectRepository(Voucher)
        private voucherRepository: Repository<Voucher>
    ) {}

    async createVoucher(createVoucherDto: CreateVoucherDto): Promise<Voucher> {
        const voucher = this.voucherRepository.create(createVoucherDto);
        return await this.voucherRepository.save(voucher);
    }
    
    async getAllVouchers(): Promise<Voucher[]> {
        return await this.voucherRepository.find();
    }
    
    async getVoucherById(id: number): Promise<Voucher> {
        const voucher = await this.voucherRepository.findOne({ where: { id } });
        if (!voucher) throw new NotFoundException('Voucher not found');
        return voucher;
    }
    
    async updateVoucher(id: number, updateData: Partial<CreateVoucherDto>): Promise<Voucher> {
        const voucher = await this.getVoucherById(id);
        Object.assign(voucher, updateData);
        return await this.voucherRepository.save(voucher);
    }
    
    async deleteVoucher(id: number): Promise<void> {
        const voucher = await this.getVoucherById(id);
        await this.voucherRepository.remove(voucher);
    }
    
    async applyVoucher(applyVoucherDto: ApplyVoucherDto): Promise<number> {
        const { code, order_value } = applyVoucherDto;
    
        const voucher = await this.voucherRepository.findOne({ where: { code, is_active: true } });
        if (!voucher) throw new NotFoundException('Voucher not found or inactive');
        if (new Date() > voucher.expires_at) throw new BadRequestException('Voucher expired');
        if (parseFloat(order_value) < voucher.min_order_value) 
          throw new BadRequestException('Order value does not meet the minimum required');
    
        // Calculate the final discount
        const percentDiscount = (voucher.discount_percent / 100) * parseFloat(order_value);
        return Math.min(percentDiscount + voucher.discount_amount, parseFloat(order_value));
    }
}