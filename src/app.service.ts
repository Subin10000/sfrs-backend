import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  constructor(
    private readonly mailerService: MailerService
  ){};
  getHello(): string {
    return 'Hello World!';
  }

  async sendMail(to: string, subject: string, text: string): Promise<any> {
    try {
      const emailSent = await this.mailerService.sendMail({
        to: to,
        from: 'sabin.sunar@wolfmatrix.com',
        subject: subject,
        text: text,
        html: `<b>${text}</b>`,
      });

      return { message: 'success', recipient: to };
    } catch (error) {
      console.error('Error sending email:', error);
      return { message: 'error', recipient: to };
    }
  }
}
