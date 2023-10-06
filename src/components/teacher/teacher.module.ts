import { Module } from '@nestjs/common';
import { TeacherService } from './teacher.service';
import { TeacherController } from './teacher.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Teacher } from './entities/teacher.entity';
import { UsersService } from '../users/users.service';
import { UsersModule } from '../users/users.module';
import { User } from '../users/entities/user.entity';
import { AppService } from 'src/app.service';

@Module({
  imports: [
    UsersModule,
    TypeOrmModule.forFeature([Teacher,User]),
  ],
  controllers: [TeacherController],
  providers: [TeacherService,UsersService,AppService],
})
export class TeacherModule {}
