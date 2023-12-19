import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import * as handlebars from 'handlebars';
import * as fs from 'fs';
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
      const templateFile = fs.readFileSync('src/templates/email-template.hbs', 'utf8');

      const compiledTemplate = handlebars.compile(templateFile);

      const html = compiledTemplate({ subject, text });

      const emailSent = await this.mailerService.sendMail({
        to,
        from: 'sabin.sunar@wolfmatrix.com',
        subject,
        text,
        html,
      });

      return { message: 'success', recipient: to };
    } catch (error) {
      console.error('Error sending email:', error);
      return { message: 'error', recipient: to };
    }
  }
}
