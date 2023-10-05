import { Module } from '@nestjs/common';
import { DropdownService } from './dropdown.service';
import { DropdownController } from './dropdown.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Dropdown } from './entities/dropdown.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Dropdown]),
  ],
  controllers: [DropdownController],
  providers: [DropdownService],
})
export class DropdownModule {}
