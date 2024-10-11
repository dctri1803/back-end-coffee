import { IsEmail, IsEnum, IsOptional, IsString } from "class-validator";

export enum UserRole {
    CUSTOMER = 'customer',
    EMPLOYEE = 'employee',
    ADMIN = 'admin',
    FRANCHISEOWNER = 'franchise_owner'
  }

export class UpdateUserDto {
    
  @IsString()
  @IsOptional()
  name?: string;

  @IsOptional()
  @IsString()
  phone_number?: string;

  @IsEnum(UserRole)
  @IsOptional()
  role?: UserRole;

  @IsString()
  @IsOptional()
  password?: string;
}