import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { JwtModule } from '@nestjs/jwt';
import { AppService } from 'src/app.service';

@Module({
  imports:[
    TypeOrmModule.forFeature([User]),
    JwtModule.register({
      global: true,
      secret: 'SECRET',
      signOptions: {expiresIn: '1d'}
    })
  ],
  controllers: [UsersController],
  providers: [UsersService,AppService],
})
export class UsersModule {}
