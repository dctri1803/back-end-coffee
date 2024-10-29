import { Body, Controller, Delete, Get, Param, Patch, Post } from "@nestjs/common";
import { ApiResponse, ApiTags } from "@nestjs/swagger";
import { VoucherService } from "../services/voucher.service";
import { CreateVoucherDto } from "../dto/create-voucher.dto";
import { Voucher } from "src/database/entities/voucher.entity";
import { ApplyVoucherDto } from "../dto/apply-voucher.dto";

@ApiTags('Vouchers')
@Controller('vouchers')
export class VoucherController {
  constructor(private readonly voucherService: VoucherService) {}

  @Post()
  @ApiResponse({ status: 201, description: 'Voucher created' })
  async createVoucher(@Body() createVoucherDto: CreateVoucherDto): Promise<Voucher> {
    return await this.voucherService.createVoucher(createVoucherDto);
  }

  @Get()
  @ApiResponse({ status: 200, description: 'List of all vouchers' })
  async getAllVouchers(): Promise<Voucher[]> {
    return await this.voucherService.getAllVouchers();
  }

  @Get(':id')
  @ApiResponse({ status: 200, description: 'Voucher details' })
  async getVoucherById(@Param('id') id: number): Promise<Voucher> {
    return await this.voucherService.getVoucherById(id);
  }

  @Patch(':id')
  @ApiResponse({ status: 200, description: 'Voucher updated' })
  async updateVoucher(
    @Param('id') id: number,
    @Body() updateData: Partial<CreateVoucherDto>,
  ): Promise<Voucher> {
    return await this.voucherService.updateVoucher(id, updateData);
  }

  @Delete(':id')
  @ApiResponse({ status: 200, description: 'Voucher deleted' })
  async deleteVoucher(@Param('id') id: number): Promise<void> {
    await this.voucherService.deleteVoucher(id);
  }

  @Post('apply')
  @ApiResponse({ status: 200, description: 'Voucher applied' })
  async applyVoucher(@Body() applyVoucherDto: ApplyVoucherDto): Promise<number> {
    return await this.voucherService.applyVoucher(applyVoucherDto);
  }
}