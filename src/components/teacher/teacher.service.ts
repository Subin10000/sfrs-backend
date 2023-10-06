import { Inject, Injectable, NotFoundException, forwardRef } from '@nestjs/common';
import { CreateTeacherDto } from './dto/create-teacher.dto';
import { UpdateTeacherDto } from './dto/update-teacher.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Teacher } from './entities/teacher.entity';
import { Repository } from 'typeorm';
import { AppService } from 'src/app.service';

@Injectable()
export class TeacherService {
  constructor(
    @InjectRepository(Teacher) private readonly teacherRepository: Repository<Teacher>,
  ){}
  create(createTeacherDto: any) {
    return this.teacherRepository.save(createTeacherDto);
  }

  findAll() {
    return this.teacherRepository.find();
  }

  async findOne(id: number): Promise<Teacher> {
    const teacher = await this.teacherRepository.findOne({
      where: { user: { id: id }},
    });

    if (!teacher) {
      // Throw an exception or handle the case where teacher is not found
      throw new NotFoundException(`Teacher with userId ${id} not found`);
    }

    return teacher;
  }

  update(id: number, updateTeacherDto: UpdateTeacherDto) {
    return this.teacherRepository.save(updateTeacherDto);
  }

  remove(id: number) {
    return `This action removes a #${id} teacher`;
  }
}
