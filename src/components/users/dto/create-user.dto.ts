import { IsNumber, IsString, IsEmail, IsNotEmpty, IsIn } from 'class-validator';
import { PrimaryGeneratedColumn, Column } from 'typeorm';

enum UserRole {
  ADMIN = 'admin',
  TEACHER = 'teacher',
}

export class CreateUserDto {
  @Column()
  @IsString()
  @IsNotEmpty()
  name: string;

  @Column({ unique: true })
  @IsEmail()
  email: string;

  @Column()
  @IsString()
  @IsNotEmpty()
  password: string;

  @Column({
    default: UserRole.TEACHER
  })
  @IsString()
  @IsIn(Object.values(UserRole))
  role: string;
}
