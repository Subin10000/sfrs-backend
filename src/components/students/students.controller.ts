import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, BadRequestException, UploadedFile, Res, UseGuards } from '@nestjs/common';
import { StudentsService } from './students.service';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { Express, Request, Response } from 'express';
import { AuthGuard } from '../users/auth/auth.guard';

@Controller('students')
export class StudentsController {
  constructor(private readonly studentsService: StudentsService) {}

  // @UseGuards(AuthGuard)
  @Post('create')
  create(@Body() createStudentDto: CreateStudentDto) {
    return this.studentsService.create(createStudentDto);
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
  Upload(@UploadedFile() uploadStudentImage: Express.Multer.File) {
    if(!uploadStudentImage){
      throw new BadRequestException('File is not  an image.');
    } else {
      const response = {
        filePath: `http://localhost:8000/students/image/${uploadStudentImage.filename}`
      };
      return response;
    }
  }

  @Get('image/:filename')
  async getPicture(@Param('filename') filename, @Res() res:Response) {
    res.sendFile(filename,{root:'./resource'});
  }

  @Get()
  findAll() {
    return this.studentsService.findAllByFilters();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.studentsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateStudentDto: UpdateStudentDto) {
    return this.studentsService.update(+id, updateStudentDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.studentsService.remove(+id);
  }
}
