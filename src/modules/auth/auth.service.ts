import { Injectable, Logger } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { IUserProps } from 'src/@types';
import { PrismaService } from 'src/prisma/prisma.service';
import {
  badRequestMessage,
  notFoundMessage,
} from 'src/validations/errors-message';

import * as bcrypt from 'bcrypt';
import { CreateUserDto } from './dtos/create-user.dto';
import { passwordHash, passwordResetCode } from 'src/utils/hash.util';
import { RequestRecoveryPasswordUserDto } from './dtos/request-recovery-password-user.dto';
import { RecoveryPasswordUserDto } from './dtos/recovery-password-user.dto';
import { addMinutes, isAfter } from 'date-fns';
import { SendMailProducerService } from 'src/jobs/mail/sendMail-producer-service.job';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
    private sendMailProducerService: SendMailProducerService,
    private logger: Logger,
  ) {}

  async userExistsByEmail(email: string) {
    try {
      const user = await this.prisma.users.findUnique({
        where: {
          email,
        },
      });

      if (!user) {
        notFoundMessage('Conta não encontrada');
      } else {
        return user;
      }
    } catch (error) {
      this.logger.error(error);
      this.logger.error(
        `Error when check user exists by email: ${error.message}`,
        error.stack,
      );
    }
  }

  async login(data: IUserProps) {
    try {
      const user = await this.prisma.users.findUnique({
        where: {
          email: data.email,
        },
      });

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

  async validateUser(email: string, password: string) {
    try {
      const user = await this.prisma.users.findUnique({
        where: {
          email,
        },
      });

      if (!user) {
        return null;
      }

      const isPasswordValid = await bcrypt.compare(password, user.password);

      if (!isPasswordValid) {
        return null;
      }

      return user;
    } catch (error) {
      this.logger.error(error);
      this.logger.error(
        `Error when validate user: ${error.message}`,
        error.stack,
      );
      throw error;
    }
  }

  async register(data: CreateUserDto) {
    try {
      const userAlreadyExists = await this.prisma.users.findUnique({
        where: {
          email: data.email,
        },
      });

      if (userAlreadyExists) {
        badRequestMessage('Conta já cadastrado');
      }

      if (!data.accepted_terms) {
        badRequestMessage('Você precisa aceitar os termos de uso');
      }

      const user = await this.prisma.users.create({
        data: {
          user_type: data.user_type,
          name: data.name,
          email: data.email,
          phone: data.phone,
          password: await passwordHash(data.password),
          accepted_terms: data.accepted_terms,
        },
      });

      return { user_id: user.id, message: 'Conta criada com sucesso' };
    } catch (error) {
      this.logger.error(error);
      this.logger.error(
        `Error when register user: ${error.message}`,
        error.stack,
      );
      throw error;
    }
  }

  async requestRecoveryPassword(data: RequestRecoveryPasswordUserDto) {
    try {
      const userExists = await this.userExistsByEmail(data.email);

      const userUpdated = await this.prisma.users.update({
        where: {
          id: userExists.id,
        },
        data: {
          password_reset_code: passwordResetCode(),
          code_expiration_date: addMinutes(new Date(), 30), // 30 minutes,
        },
      });

      this.sendMailProducerService.sendMail({
        email: data.email,
        code: userUpdated.password_reset_code,
      });

      return {
        message: 'Foi enviado um código de confirmação para seu e-mail',
      };
    } catch (error) {
      this.logger.error(error);
      this.logger.error(
        `Error when request recovery password: ${error.message}`,
        error.stack,
      );
      throw error;
    }
  }

  async recoveryPassword(data: RecoveryPasswordUserDto) {
    try {
      const userExists = await this.userExistsByEmail(data.email);

      if (userExists.password_reset_code !== data.password_reset_code) {
        badRequestMessage('Código de confirmação inválido');
      }

      if (isAfter(new Date(), userExists.code_expiration_date)) {
        badRequestMessage('Código de confirmação expirado');
      }

      await this.prisma.users.update({
        where: {
          id: userExists.id,
        },
        data: {
          password: await passwordHash(data.password),
          password_reset_code: null,
          code_expiration_date: null,
        },
      });

      return { message: 'Senha alterada com sucesso' };
    } catch (error) {
      this.logger.error(error);
      this.logger.error(
        `Error when recovery password: ${error.message}`,
        error.stack,
      );
      throw error;
    }
  }
}
