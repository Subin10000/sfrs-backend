import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './components/users/entities/user.entity';
import { UsersModule } from './components/users/users.module';
import { StudentsModule } from './components/students/students.module';
import { Student } from './components/students/entities/student.entity';
import { UtilsModule } from './components/utils/utils.module';
import { Dropdown } from './components/dropdown/entities/dropdown.entity';
import { DropdownModule } from './components/dropdown/dropdown.module';
import { TeacherModule } from './components/teacher/teacher.module';
import { Teacher } from './components/teacher/entities/teacher.entity';
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
      entities: [User,Student,Dropdown,Teacher,Attendance],
      synchronize: true,
    }),
    UsersModule,
    StudentsModule,
    UtilsModule,
    DropdownModule,
    TeacherModule,
    AttendanceModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
