import { Controller, Get, Post, Body, Patch, Param, Delete, HttpStatus, HttpException, forwardRef, Inject } from '@nestjs/common';
import { TeacherService } from './teacher.service';
import { CreateTeacherDto } from './dto/create-teacher.dto';
import { UpdateTeacherDto } from './dto/update-teacher.dto';
import * as bcrypt from 'bcrypt';
import { UsersService } from '../users/users.service';
import { AppService } from 'src/app.service';

@Controller('teacher')
export class TeacherController {
  constructor(
    @Inject(forwardRef(() => AppService))
    private readonly appService: AppService,
    private readonly teacherService: TeacherService,
    private readonly userService: UsersService
    ) {}

  @Post("create")
  async create(@Body() createTeacherDto: CreateTeacherDto) {
    try {
      const length = 8;
      const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
      let result = '';
      for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
      result += characters.charAt(randomIndex);
      }
      const hashedPassword = await bcrypt.hash(result, 12);
      const createUser = {
        name: createTeacherDto.name,
        email: createTeacherDto.email,
        password: hashedPassword, // Use the hashed password here
        role: createTeacherDto.role,
      };
      const newUser = await this.userService.create(createUser);
      if (newUser) {
        const emailSubject = "Your account has been Created"
        const emailBody = `Your user and teacher account has been created. your credentials to login to the system are: <br> Email: ${createTeacherDto.email} <br> Password: ${result} <br> Regards, <br> SFRS`
        this.appService.sendMail(createTeacherDto.email,emailSubject,emailBody)
          const newTeacher = {
            class : createTeacherDto.class,
            faculty : createTeacherDto.faculty,
            user : newUser.id
          }
          return this.teacherService.create(newTeacher);
      } else {
        throw new HttpException('Failed to create teacher', HttpStatus.INTERNAL_SERVER_ERROR);
      }
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Get()
  async findAll() {
    const teachers = await this.teacherService.findAll();
    const filteredTeacher = teachers.map(teacher => {
      const { user, ...rest } = teacher;
      const sanitizedUser = { ...user, password: undefined };
      return { ...rest, user: sanitizedUser };
    });
    return filteredTeacher;
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.teacherService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTeacherDto: UpdateTeacherDto) {
    return this.teacherService.update(+id, updateTeacherDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.teacherService.remove(+id);
  }
}
