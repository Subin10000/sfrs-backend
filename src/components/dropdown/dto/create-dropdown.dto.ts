import { IsString, IsNotEmpty, IsOptional } from 'class-validator';

export class CreateDropdownDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsOptional()
  @IsString()
  description: string;

  @IsNotEmpty()
  @IsString()
  type: string;
}
