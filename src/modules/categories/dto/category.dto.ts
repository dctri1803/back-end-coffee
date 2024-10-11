import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class categoryDto {
    @ApiProperty({ type: String })
    @IsNotEmpty()
    name: string;
}