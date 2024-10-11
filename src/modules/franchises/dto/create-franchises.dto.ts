import {
    IsString,
    IsNotEmpty,
    IsInt,
    Matches,
  } from 'class-validator';
  
  export class CreateFranchiseDto {
    @IsString()
    @IsNotEmpty()
    name: string;
  
    @IsInt({ message: 'owner_id must be an integer number' })
    @IsNotEmpty({ message: 'owner_id is required' })
    owner_id: number;
  
    @IsString()
    @IsNotEmpty()
    address: string;
  
    @IsNotEmpty()
    @Matches(/^\+?\d{10,15}$/, {
      message: 'phone_number must be a valid phone number',
    }) // regex để kiểm tra định dạng
    phone_number: string;
  }