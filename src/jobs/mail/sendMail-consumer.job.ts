import { MailerService } from '@nestjs-modules/mailer';
import { render } from '@react-email/render';
import { Process, Processor } from '@nestjs/bull';
import { Job } from 'bull';
import { ISendMailProps } from 'src/@types';
import { ResetPasswordCodeEmail } from 'src/template-mail/reset-password-code';
import { AccountActivationCodeEmail } from 'src/template-mail/account-activation-code';

@Processor('sendMail-queue')
export class SendMailConsumer {
  constructor(private mailService: MailerService) {}

  @Process('sendMail-job')
  async sendMail(job: Job<ISendMailProps>) {
    const { data } = job;

    const resetPasswordCodeEmailHtml = render(
      ResetPasswordCodeEmail({ validationCode: data.code }),
    );

    const accountActivationCodeEmailHtml = render(
      AccountActivationCodeEmail({ validationCode: data.code }),
    );

    await this.mailService.sendMail({
      to: data.email,
      from: process.env.MAIL_SENDER,
      subject: 'Código para confirmação da conta',
      html:
        data.type === 'resetPassword'
          ? resetPasswordCodeEmailHtml
          : accountActivationCodeEmailHtml,
    });
  }
}
