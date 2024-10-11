import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class UpdateAddressDto {
    @ApiProperty()
    address_line?: string;


    @ApiProperty()
    city?: string;

    @ApiProperty()
    state?: string;

    @ApiProperty()
    postal_code?: string;

    @ApiProperty()
    country?: string;

    @ApiProperty({ default: true })
    is_default?: boolean;
}
