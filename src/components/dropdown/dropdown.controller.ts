import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { DropdownService } from './dropdown.service';
import { CreateDropdownDto } from './dto/create-dropdown.dto';
import { UpdateDropdownDto } from './dto/update-dropdown.dto';

@Controller('dropdown')
export class DropdownController {
  constructor(private readonly dropdownService: DropdownService) {}

  @Post('create')
  create(@Body() createDropdownDto: CreateDropdownDto) {
    return this.dropdownService.create(createDropdownDto);
  }

  @Get()
  findAll() {
    return this.dropdownService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.dropdownService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDropdownDto: UpdateDropdownDto) {
    return this.dropdownService.update(+id, updateDropdownDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.dropdownService.remove(+id);
  }
}
