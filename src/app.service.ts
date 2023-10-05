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

  sendMail(): void {
    this.mailerService.sendMail({
      to: 'kerby.nabin57@gmail.com',
      from: 'sabin.sunar@wolfmatrix.com',
      subject: 'Testing a mail being send',
      text: 'Welcome',
      html: '<b>Welcome</b>',
    })
  }
}
