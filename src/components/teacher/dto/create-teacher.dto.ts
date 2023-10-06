import { IsString, IsEmail, IsNotEmpty, IsInt } from 'class-validator';
import { Dropdown } from 'src/components/dropdown/entities/dropdown.entity';

export class CreateTeacherDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  password: string;

  @IsNotEmpty()
  @IsString()
  role: string;

  @IsNotEmpty()
  @IsInt()
  class: Dropdown;

  @IsNotEmpty()
  @IsInt()
  faculty: Dropdown;
}
