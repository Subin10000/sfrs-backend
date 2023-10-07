import { Body, Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';

@Controller('api')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('home')
  getHello(): string {
    return this.appService.getHello();
  }

  @Post('email')
  sendMail(@Body() body : any)  {
    const { to, subject, text } = body;

    console.log(to, subject, text);

    const receiver = to || '';
    const emailSubject = subject || '';
    const emailBody = text || '';

    return this.appService.sendMail(receiver, emailSubject, emailBody);
  }
}
