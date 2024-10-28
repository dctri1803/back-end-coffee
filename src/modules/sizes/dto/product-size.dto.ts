import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsString, Min } from "class-validator";

export class CreateProductSizeDto {
    @ApiProperty({
        description: 'Tên size (M, L,...)',
        example: 'M',
    })
    @IsString()
    @IsNotEmpty()
    name: string;

    @ApiProperty({
        description: 'Giá điều chỉnh cho size',
        example: 10000,
    })
    @IsNumber()
    @Min(0)
    price_adjustment: number;
}
