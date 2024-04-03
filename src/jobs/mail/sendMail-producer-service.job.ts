import { InjectQueue } from '@nestjs/bull';
import { Injectable } from '@nestjs/common';
import { Queue } from 'bull';
import { ISendMailProps } from 'src/types';

@Injectable()
export class SendMailProducerService {
  constructor(@InjectQueue('sendMail-queue') private queue: Queue) {}

  async sendMail({ email, code, type }: ISendMailProps) {
    await this.queue.add('sendMail-job', { email, code, type });
  }
}
