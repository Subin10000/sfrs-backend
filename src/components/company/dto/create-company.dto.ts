import { User } from "src/components/users/entities/user.entity";
import { IsNotEmpty, IsEmail, IsString } from 'class-validator';

export class CompanyDTO {
    @IsNotEmpty()
    name: string;

    @IsNotEmpty()
    @IsEmail()
    email: string;

    @IsNotEmpty()
    @IsString()
    phoneNumber: string;

    @IsNotEmpty()
    @IsString()
    location: string;

    @IsNotEmpty()
    @IsString()
    role: string;

    @IsNotEmpty()
    user: User;
}
