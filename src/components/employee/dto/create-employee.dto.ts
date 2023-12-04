import { IsString, IsEmail, IsOptional, IsDate } from 'class-validator';

export class CreateEmployeeDTO {
  @IsOptional()
  id?: number;

  @IsString()
  firstName: string;

  @IsString()
  lastName: string;

  @IsEmail()
  email: string;

  @IsString()
  location: string;

  @IsOptional()
  @IsDate()
  startDate?: Date;

  @IsOptional()
  @IsDate()
  dateOfBirth?: Date;

  @IsOptional()
  @IsString() 
  image?: string;
}
