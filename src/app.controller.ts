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
  sendMail(@Body() body: any) {
    const { to, subject, text } = body;

    // If 'to' is an array, call sendMail for each recipient
    if (Array.isArray(to)) {
      const promises = to.map((recipient: string) =>
        this.appService.sendMail(recipient, subject, text)
      );

      // Wait for all promises to resolve
      return Promise.all(promises)
        .then(() => ({ message: 'success' }))
        .catch(() => ({ message: 'error' }));
    } else {
      // If 'to' is a single email address, call sendMail once
      return this.appService.sendMail(to, subject, text);
    }
  }
}
