import { MailerService } from '@nestjs-modules/mailer';
import { Process, Processor } from '@nestjs/bull';
import { render } from '@react-email/render';
import { Job } from 'bull';
import { AccountActivationCodeEmail } from 'src/template-mail/account-activation-code';
import { ResetPasswordCodeEmail } from 'src/template-mail/reset-password-code';
import { ISendMailProps } from 'src/types';

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
