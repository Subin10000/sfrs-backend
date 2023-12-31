import { Injectable } from '@nestjs/common';
import { CreateDropdownDto } from './dto/create-dropdown.dto';
import { UpdateDropdownDto } from './dto/update-dropdown.dto';
import { Dropdown } from './entities/dropdown.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class DropdownService {
  constructor(
    @InjectRepository(Dropdown) private readonly dropdownRepository: Repository<Dropdown>,
  ){}
  create(createDropdownDto: CreateDropdownDto) {
    return this.dropdownRepository.save(createDropdownDto)
  }

  findAll() {
    return this.dropdownRepository.find();
  }

  findOne(id: number) {
    return `This action returns a #${id} dropdown`;
  }

  update(id: number, updateDropdownDto: UpdateDropdownDto) {
    return `This action updates a #${id} dropdown`;
  }

  remove(id: number) {
    return `This action removes a #${id} dropdown`;
  }
}
