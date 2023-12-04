import { Module } from '@nestjs/common';
import { CompanyService } from './company.service';
import { CompanyController } from './company.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Company } from './entities/company.entity';
import { UsersService } from '../users/users.service';
import { UsersModule } from '../users/users.module';
import { User } from '../users/entities/user.entity';
import { AppService } from 'src/app.service';

@Module({
  imports: [
    UsersModule,
    TypeOrmModule.forFeature([Company,User]),
  ],
  controllers: [CompanyController],
  providers: [CompanyService,UsersService,AppService],
})
export class CompanyModule {}
