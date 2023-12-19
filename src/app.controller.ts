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
  async sendMail(@Body() body: any) {
    const { to, subject, text } = body;

    try {
      if (Array.isArray(to)) {
        const promises = to.map((recipient: string) =>
          this.appService.sendMail(recipient, subject, text)
        );

        const results = await Promise.all(promises);

        const hasError = results.some((result) => result.message === 'error');

        return { message: hasError ? 'error' : 'success', recipients: to };
      } else {
        const result = await this.appService.sendMail(to, subject, text);
        return result;
      }
    } catch (error) {
      console.error('Error sending email:', error);
      return { message: 'error', recipients: Array.isArray(to) ? to : [to] };
    }
  }
}
