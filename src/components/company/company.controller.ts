import { Controller, Get, Post, Body, Patch, Param, Delete, HttpStatus, HttpException, forwardRef, Inject } from '@nestjs/common';
import { CompanyDTO } from './dto/create-company.dto';
import * as bcrypt from 'bcrypt';
import { UsersService } from '../users/users.service';
import { AppService } from 'src/app.service';
import { CompanyService } from './company.service';
import { UpdateCompanyDto } from './dto/update-company.dto';

@Controller('company')
export class CompanyController {
  constructor(
    @Inject(forwardRef(() => AppService))
    private readonly appService: AppService,
    private readonly companyService: CompanyService,
    private readonly userService: UsersService
    ) {}

    @Post('create')
    async create(@Body() createCompanyDto: CompanyDTO) {
      try {
        const length = 8;
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let result = '';
        for (let i = 0; i < length; i++) {
          const randomIndex = Math.floor(Math.random() * characters.length);
          result += characters.charAt(randomIndex);
        }
        
        const hashedPassword = await bcrypt.hash(result, 12);
    
        // Create a new user
        const createUser = {
          name: createCompanyDto.name,
          email: createCompanyDto.email,
          password: hashedPassword,
          role: createCompanyDto.role,
        };
    
        const newUser = await this.userService.create(createUser);
    
        if (newUser) {
          // Create a new company
          const newCompany = {
            name: createCompanyDto.name,
            email: createCompanyDto.email,
            phoneNumber: createCompanyDto.phoneNumber,
            location: createCompanyDto.location,
            role: createCompanyDto.role,
            user: newUser, // Assign the user object to the user property
          };
    
          await this.companyService.create(newCompany);
    
          // Send email and return a response
          const emailSubject = "Your account has been Created";
          const emailBody = `Your user and company account has been created. Your credentials to login to the system are: <br> Email: ${createCompanyDto.email} <br> Password: ${result} <br> Regards, <br> SFRS`;
    
          this.appService.sendMail(createCompanyDto.email, emailSubject, emailBody);
    
          return { message: 'Company and user created successfully.' };
        } else {
          throw new HttpException('Failed to create company', HttpStatus.INTERNAL_SERVER_ERROR);
        }
      } catch (error) {
        throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
      }
    }
    

  @Get()
  async findAll() {
    const teachers = await this.companyService.findAll();
    const filteredCompany = teachers.map(company => {
      const { user, ...rest } = company;
      const sanitizedUser = { ...user, password: undefined };
      return { ...rest, user: sanitizedUser };
    });
    return filteredCompany;
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.companyService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCompanyDto: UpdateCompanyDto) {
    return this.companyService.update(+id, updateCompanyDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.companyService.remove(+id);
  }
}
