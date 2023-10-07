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

  sendMail(to:string,subject:string,text: string): any {
    const emailSent =  this.mailerService.sendMail({
      to: to,
      from: 'sabin.sunar@wolfmatrix.com',
      subject: subject,
      text: text,
      html: `<b>${text}</b>`,
    })
    if(emailSent){
      return {message: 'success'}
    }
  }
}
