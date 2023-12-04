import { Injectable } from '@nestjs/common';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Employee } from './entities/employee.entity'; 
import { Repository } from 'typeorm';
import { CreateEmployeeDTO } from './dto/create-employee.dto';

@Injectable()
export class EmployeesService {
  constructor(
    @InjectRepository(Employee) private readonly employeeRepository: Repository<Employee>,
  ) {}

  create(createEmployeeDto: CreateEmployeeDTO) {
    return this.employeeRepository.save(createEmployeeDto);
  }

  upload(uploadEmployeeImage: Express.Multer.File) {
    return 'This action uploads a new employee';
  }

  async findAllByFilters(companyId: number): Promise<Employee[]> {
    return this.employeeRepository.find({
      where: { company: { id: companyId } },
      relations: ['company'], // Include company information in the result
    });
  }

  findOne(id: number) {
    return `This action returns a #${id} employee`;
  }

  update(id: number, updateEmployeeDto: UpdateEmployeeDto) { 
    return `This action updates a #${id} employee`;
  }

  remove(id: number) {
    return `This action removes a #${id} employee`;
  }
}
