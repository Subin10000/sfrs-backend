import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './components/users/entities/user.entity';
import { UsersModule } from './components/users/users.module';
import { EmployeeModule } from './components/employee/employee.module';
import { Employee } from './components/employee/entities/employee.entity';
import { UtilsModule } from './components/utils/utils.module';
import { Dropdown } from './components/dropdown/entities/dropdown.entity';
import { DropdownModule } from './components/dropdown/dropdown.module';
import { CompanyModule } from './components/company/company.module';
import { Company } from './components/company/entities/company.entity';
import { MailerModule } from '@nestjs-modules/mailer';
import { Attendance } from './components/attendance/entities/attendance.entity';
import { AttendanceModule } from './components/attendance/attendance.module';

@Module({
  imports: [
    MailerModule.forRoot({
      transport: {
        host: 'smtp.zoho.com',
        auth: {
          user: 'sabin.sunar@wolfmatrix.com',
          pass: 'S@1234ub!n',
        },
      },
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'root',
      database: 'sfrs',
      entities: [User,Employee,Dropdown,Company,Attendance],
      synchronize: true,
    }),
    UsersModule,
    EmployeeModule,
    UtilsModule,
    DropdownModule,
    CompanyModule,
    AttendanceModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
