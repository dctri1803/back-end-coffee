import { ApiPropertyOptional } from "@nestjs/swagger";
import { IsOptional, IsString } from "class-validator";

export class UpdateOrderDetailsDto {
    @ApiPropertyOptional({ example: '123 Đường ABC, Quận 1, Thành phố Hồ Chí Minh', description: 'Địa chỉ mới' })
    @IsString()
    @IsOptional()
    address?: string;

    @ApiPropertyOptional({ example: '0901234567', description: 'Số điện thoại mới' })
    @IsString()
    @IsOptional()
    phone_number?: string;

    @ApiPropertyOptional({ example: 'Nguyễn Văn B', description: 'Tên khách hàng mới' })
    @IsString()
    @IsOptional()
    customer_name?: string;
}