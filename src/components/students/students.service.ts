import { Injectable } from '@nestjs/common';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Student } from './entities/student.entity';
import { Repository } from 'typeorm';

@Injectable()
export class StudentsService {
  constructor(
    @InjectRepository(Student) private readonly studentRepository: Repository<Student>,
  ){}
  create(createStudentDto: CreateStudentDto) {
    return this.studentRepository.save(createStudentDto)
  }

  upload(uploadStudentImage: Express.Multer.File) {
    return 'This action uploads a new student';
  }

  findAllByFilters(classId?: string, facultyId?: string, search?: string): Promise<Student[]> {
    let query = this.studentRepository.createQueryBuilder('student');

    if (classId) {
      query = query.where('student.classId = :classId', { classId });
    }

    if (facultyId) {
      query = query.andWhere('student.facultyId = :facultyId', { facultyId });
    }

    if (search) {
      query = query.andWhere('(student.name LIKE :search OR student.rollNumber LIKE :search)', {
        search: `%${search}%`,
      });
    }

    return query.getMany();
  }

  findOne(id: number) {
    return `This action returns a #${id} student`;
  }

  update(id: number, updateStudentDto: UpdateStudentDto) {
    return `This action updates a #${id} student`;
  }

  remove(id: number) {
    return `This action removes a #${id} student`;
  }
}
