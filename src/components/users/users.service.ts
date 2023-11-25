import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,

  ){}

  
  async create(createUserDto: CreateUserDto): Promise<User> {
    return this.userRepository.save(createUserDto)
  }

  
  async findOne(condition: any){
    return this.userRepository.findOne({where: {email : condition}});
  }
  
  async sendPasswordResetEmail(email: string){
    try {
      const user = await this.userRepository.findOne({where: {email : email}});
      console.log(user);
      if (user) {
        const resetToken = this.generateResetToken();

        user.resetToken = resetToken;
        user.resetTokenExpires = new Date(Date.now() + 3600000);
        await this.userRepository.save(user);
        return resetToken;
      }
    } catch (error) {
      throw new HttpException(`Failed to send password reset email: ${error.message}`, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async resetPassword(token: string, newPassword: string): Promise<void> {
    try {
      const user = await this.userRepository.findOne({where: {resetToken : token}});

      if (user && user.resetTokenExpires > new Date()) {
        const hashedPassword = await bcrypt.hash(newPassword, 12);
        user.password = hashedPassword;
        user.resetToken = null;
        user.resetTokenExpires = null;
        await this.userRepository.save(user);
      } else {
        throw new HttpException('Invalid or expired token', HttpStatus.BAD_REQUEST);
      }
    } catch (error) {
      throw new HttpException(`Failed to reset password: ${error.message}`, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  private generateResetToken() {
    const length = 32;
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      result += characters.charAt(randomIndex);
    }
    return result;
  }
}
