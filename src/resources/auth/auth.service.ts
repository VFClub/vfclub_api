import { Injectable, Logger } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma/prisma.service';
import { IUserProps } from 'src/types';
import {
  badRequestMessage,
  notFoundMessage,
} from 'src/validations/errors-message';

import { SendMailProducerService } from 'src/jobs/mail/sendMail-producer-service.job';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
    private sendMailProducerService: SendMailProducerService,
    private logger: Logger,
  ) {}

  async login(data: IUserProps) {
    try {
      const user = await this.prisma.users.findUnique({
        where: {
          email_user_type: {
            email: data.email,
            user_type: data.user_type,
          },
        },
      });

      if (!user) {
        notFoundMessage('Conta não encontrada');
      }

      if (data.user_type === 'admin' && !user.account_is_active) {
        badRequestMessage('Ative sua conta para fazer login');
      }

      return {
        access_token: this.jwtService.sign({
          email: data.email,
          id: user.id,
        }),
      };
    } catch (error) {
      this.logger.error(error);
      this.logger.error(`Error when login: ${error.message}`, error.stack);
      throw error;
    }
  }
}
