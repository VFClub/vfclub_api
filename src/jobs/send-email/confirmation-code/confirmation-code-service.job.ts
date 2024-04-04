import { InjectQueue } from '@nestjs/bull';
import { Injectable } from '@nestjs/common';
import { Queue } from 'bull';

// types
import { IConfirmationCodeJobProps } from '@/types/jobs';

@Injectable()
export class ConfirmationCodeService {
  constructor(@InjectQueue('confirmationCode-queue') private queue: Queue) {}

  async handle({ email, code, type }: IConfirmationCodeJobProps) {
    await this.queue.add('confirmationCode-job', { email, code, type });
  }
}
