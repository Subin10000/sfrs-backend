import { PartialType } from '@nestjs/mapped-types';
import { CompanyDTO } from './create-company.dto';

export class UpdateCompanyDto extends PartialType(CompanyDTO) {}
