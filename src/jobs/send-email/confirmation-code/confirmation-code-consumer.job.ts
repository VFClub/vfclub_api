import { AccountActivationCodeEmail } from '@/template-mail/account-activation-code';
import { ResetPasswordCodeEmail } from '@/template-mail/reset-password-code';
import { ISendMailProps } from '@/types';
import { MailerService } from '@nestjs-modules/mailer';
import { Process, Processor } from '@nestjs/bull';
import { render } from '@react-email/components';
import { Job } from 'bull';

@Processor('confirmationCode-queue')
export class ConfirmationCodeConsumer {
  constructor(private mailService: MailerService) {}

  @Process('confirmationCode-job')
  async handle(job: Job<ISendMailProps>) {
    const { data } = job;
    console.log('ConfirmationCodeConsumer', data);

    try {
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
          data.type === 'accountActivation'
            ? accountActivationCodeEmailHtml
            : resetPasswordCodeEmailHtml,
      });

      console.log('Email sent');
    } catch (error) {
      console.log('ConfirmationCodeConsumer error', error);
    }
  }
}
