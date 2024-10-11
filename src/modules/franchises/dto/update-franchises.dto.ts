import { IsOptional, IsString } from 'class-validator';

export class UpdateFranchiseDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  address?: string;

  @IsOptional()
  @IsString()
  phone_number?: string;

  @IsOptional()
  owner_id?: number;
}