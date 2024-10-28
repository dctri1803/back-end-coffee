import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsString, Min } from "class-validator";

export class CreateToppingDto {
    @ApiProperty({
        description: 'Tên topping',
        example: 'Trân châu đen',
    })
    @IsString()
    @IsNotEmpty()
    name: string;

    @ApiProperty({
        description: 'Giá của topping',
        example: 10000,
    })
    @IsNumber()
    @Min(0)
    price: number;
}
