
import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, BadRequestException, UploadedFile, Res, UseGuards } from '@nestjs/common';
import { EmployeesService } from './employee.service';
import { CreateEmployeeDTO } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { Express, Request, Response } from 'express';

@Controller('employees')
export class EmployeesController {
  constructor(private readonly employeesService: EmployeesService) {}

  // @UseGuards(AuthGuard)
  @Post('create')
  create(@Body() createEmployeeDto: CreateEmployeeDTO) {
    return this.employeesService.create(createEmployeeDto);
  }

  @Post('upload')
  @UseInterceptors(FileInterceptor('file',{
    storage: diskStorage({
      destination: './resource', 
      filename: (req,file,cb)=> {
        const name = file.originalname.split('.')[0];
        const fileExtension = file.originalname.split('.')[1];
        const newFileName = name.split(' ')+"." + fileExtension;
        
        cb(null,newFileName);
      }
    }), 
    fileFilter: (res, file, cb) => {
      if(!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)){
        return cb(null, false);
      }
      cb(null,true);
    } 
  }))
  Upload(@UploadedFile() uploadEmployeeImage: Express.Multer.File) { 
    if(!uploadEmployeeImage){
      throw new BadRequestException('File is not an image.');
    } else {
      const response = {
        filePath: `http://localhost:8000/employees/image/${uploadEmployeeImage.filename}`
      };
      return response;
    }
  }

  @Get('image/:filename')
  async getPicture(@Param('filename') filename, @Res() res:Response) {
    res.sendFile(filename,{root:'./resource'});
  }

  @Get(':companyId')
  findAllByCompany(@Param('companyId') companyId: number) {
    return this.employeesService.findAllByFilters(companyId);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateEmployeeDto: UpdateEmployeeDto) {
    return this.employeesService.update(+id, updateEmployeeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.employeesService.remove(+id);
  }
}
