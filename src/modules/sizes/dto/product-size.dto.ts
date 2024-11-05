import { ApiProperty } from "@nestjs/swagger";
import { IsEnum, IsNotEmpty, IsNumber, IsString, Min } from "class-validator";

export class CreateProductSizeDto {
    @ApiProperty({
        description: 'Tên size (M, L,...)',
        example: 'M',
        enum: ['M', 'L', 'XL'], // Add this to show possible values in API documentation
    })
    @IsNotEmpty()
    @IsEnum(['M', 'L', 'XL']) // Use IsEnum for type safety
    size: 'M' | 'L' | 'XL'; // Change to specific union type
    @ApiProperty({
        description: 'Giá điều chỉnh cho size',
        example: 10000,
    })
    @IsNumber()
    @Min(0)
    price_adjustment: number;
}
