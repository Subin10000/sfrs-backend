import { Module } from '@nestjs/common';
import { EmployeesController } from './employee.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Employee } from './entities/employee.entity';
import { EmployeesService } from './employee.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Employee]),
  ],
  controllers: [EmployeesController],
  providers: [EmployeesService],
})
export class EmployeeModule {}
