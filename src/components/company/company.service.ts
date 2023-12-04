import { Inject, Injectable, NotFoundException, forwardRef } from '@nestjs/common';
import { CompanyDTO } from './dto/create-company.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Company } from './entities/company.entity';
import { Repository } from 'typeorm';
import { AppService } from 'src/app.service';
import { UpdateCompanyDto } from './dto/update-company.dto';

@Injectable()
export class CompanyService {
  constructor(
    @InjectRepository(Company) private readonly companyRepository: Repository<Company>,
  ){}
  create(createCompanyDto: any) {
    return this.companyRepository.save(createCompanyDto);
  }

  findAll() {
    return this.companyRepository.find();
  }

  async findOne(id: number): Promise<Company> {
    const company = await this.companyRepository.findOne({
      where: { user: { id: id }},
    });
    if (!company) {
      // Throw an exception or handle the case where company is not found
      throw new NotFoundException(`Company with userId ${id} not found`);
    }

    return company;
  }

  update(id: number, updateCompanyDto: UpdateCompanyDto) {
    // return this.companyRepository.save(updateCompanyDto);
  }

  remove(id: number) {
    return `This action removes a #${id} company`;
  }
}
