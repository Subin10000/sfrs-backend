import { Controller, Get, Post, Body, Patch, Param, Delete, BadRequestException, Res, Req, UnauthorizedException } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { Response, Request } from 'express';
import { AppService } from 'src/app.service';

@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private jwtService: JwtService,
    private readonly appService: AppService,
    ) {}

  @Post('create')
  async create(@Body() createUserDto: CreateUserDto) {
    if (!createUserDto.role) {
      createUserDto.role = 'teachers';
    }
    const hashedPassword = await bcrypt.hash(createUserDto.password, 12);
    createUserDto.password = hashedPassword;
    const user = this.usersService.create(createUserDto);
    delete (await user).password; 
    return user;
  }

  @Post('login')
  async login(
    @Body() createUserDto: CreateUserDto,
    @Res({passthrough:true}) response: Response
  ){
    const user = await this.usersService.findOne(createUserDto.email);
    if(!user){
      throw new BadRequestException('Invalid Credentials');
    }

    if(!await bcrypt.compare(createUserDto.password, user.password)){
      throw new BadRequestException('Invalid Credentials');
    }
    
    const jwt = await this.jwtService.signAsync({id:user.id, role:user.role})

    response.cookie('jwt ',jwt,{httpOnly:true})
    return {
      token: jwt
    };
  }

  @Get('user')
  async user(@Req() request: Request){
    try{
      const cookie = request.cookies['jwt'];
      const data = await this.jwtService.verifyAsync(cookie);
      if(!data){
        throw new UnauthorizedException();
      }
      const user = await this.usersService.findOne({id: data['id']})

      const {password, ...result} = user;

      return result;
    }catch(e){
      throw new UnauthorizedException();
    }
  }

  @Post('logout')
  async logout(
    @Res({passthrough:true}) response: Response,
  ){
    response.clearCookie('jwt');
    return {
      message: 'success'
    }
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(+id);
  }

  @Post('request-password-reset')
  async requestPasswordReset(@Body() body: { email: string }) {
    const resetToken = await this.usersService.sendPasswordResetEmail(body.email);
    const resetLink = `http://localhost:3000/reset-password/${resetToken}`;
    const emailSubject = 'Password Reset';
    const emailBody = `Click the following link to reset your password: ${resetLink}`;
    this.appService.sendMail(body.email,emailSubject,emailBody)
    return { message: 'Password reset email sent successfully' };
  }

  @Post('reset-password/:token')
  async resetPassword(@Param('token') token: string, @Body() body: { password: string }) {
    await this.usersService.resetPassword(token, body.password);
    return { message: 'Password reset successfully' };
  }
}
