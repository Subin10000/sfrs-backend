import { IsString, IsEmail, IsNotEmpty } from 'class-validator';
import { Dropdown } from 'src/components/dropdown/entities/dropdown.entity';

export class CreateStudentDto {
  @IsNotEmpty()
  @IsString()
  firstname: string;

  @IsNotEmpty()
  @IsString()
  lastname: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  phone: string;

  @IsNotEmpty()
  @IsString()
  roll: string;

  @IsNotEmpty()
  @IsString()
  image: string;

  @IsNotEmpty()
  class: Dropdown;

  @IsNotEmpty()
  faculty: Dropdown;
}
