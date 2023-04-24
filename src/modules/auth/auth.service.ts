import { Injectable, Logger } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { IUserProps } from 'src/@types';
import { PrismaService } from 'src/prisma/prisma.service';
import {
  badRequestMessage,
  notFoundMessage,
} from 'src/validations/errors-message';

import * as bcrypt from 'bcrypt';
import { CreatePlayerDto } from './dtos/create-player.dto';
import {
  activateAccountCode,
  passwordHash,
  passwordResetCode,
} from 'src/utils/hash.util';
import { RequestRecoveryPasswordUserDto } from './dtos/request-recovery-password-user.dto';
import { RecoveryPasswordUserDto } from './dtos/recovery-password-user.dto';
import { addMinutes, isAfter } from 'date-fns';
import { SendMailProducerService } from 'src/jobs/mail/sendMail-producer-service.job';
import { CreateAdminDto } from './dtos/create-admin.dto';
import { ActivateAccountAdmDto } from './dtos/activate-account.sto';

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
      }

      return user;
    } catch (error) {
      this.logger.error(error);
      this.logger.error(
        `Error when check user exists by email: ${error.message}`,
        error.stack,
      );
    }
  }

  async userTypeExists(user_type: string) {
    try {
      if (user_type !== 'player' && user_type !== 'admin') {
        badRequestMessage('Tipo de usuário inválido');
      }
    } catch (error) {
      this.logger.error(error);
      this.logger.error(
        `Error when check user type exists: ${error.message}`,
        error.stack,
      );
    }
  }

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

      this.userTypeExists(data.user_type);

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

  async validateUser(email: string, password: string) {
    try {
      const user = await this.prisma.users.findFirst({
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

  async registerPlayer(data: CreatePlayerDto) {
    try {
      const userAlreadyExists = await this.userExistsByEmail(data.email);

      this.userTypeExists(data.user_type);

      if (data.user_type !== 'player') {
        badRequestMessage('Tipo de usuário inválido');
      }

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
        `Error when register player: ${error.message}`,
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
        type: 'resetPassword',
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

  // adm

  async registerAdmin(data: CreateAdminDto) {
    try {
      const userAlreadyExists = await this.userExistsByEmail(data.email);

      this.userTypeExists(data.user_type);

      if (data.user_type !== 'admin') {
        badRequestMessage('Tipo de usuário inválido');
      }

      if (userAlreadyExists) {
        badRequestMessage('Conta já cadastrado');
      }

      const user = await this.prisma.users.create({
        data: {
          user_type: data.user_type,
          name: data.name,
          email: data.email,
          phone: data.phone,
          created_by: data.created_by,
          account_is_active: false,
          account_activation_code: activateAccountCode(),
          password: await passwordHash(data.password),
        },
      });

      this.sendMailProducerService.sendMail({
        email: user.email,
        code: user.account_activation_code,
        type: 'accountActivation',
      });

      return {
        user_id: user.id,
        message: 'Conta criada com sucesso, aguarde a ativação da conta',
      };
    } catch (error) {
      this.logger.error(error);
      this.logger.error(
        `Error when register admin: ${error.message}`,
        error.stack,
      );
      throw error;
    }
  }

  async activateAccountAdmin(data: ActivateAccountAdmDto) {
    try {
      const userExists = await this.userExistsByEmail(data.email);

      if (!userExists) {
        badRequestMessage('Conta não encontrada');
      }

      if (userExists.account_activation_code !== data.account_activation_code) {
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
          account_is_active: true,
          account_activation_code: null,
          code_expiration_date: null,
        },
      });

      return { message: 'Conta ativada com sucesso' };
    } catch (error) {
      this.logger.error(error);
      this.logger.error(
        `Error when activate account admin: ${error.message}`,
        error.stack,
      );
      throw error;
    }
  }

  async resendActivationCodeAdmin(data: { email: string }) {
    try {
      const userExists = await this.userExistsByEmail(data.email);

      if (userExists.account_is_active) {
        badRequestMessage('Conta já ativada');
      }

      const updateUser = await this.prisma.users.update({
        where: {
          id: userExists.id,
        },
        data: {
          account_activation_code: activateAccountCode(),
          code_expiration_date: addMinutes(new Date(), 30), // 30 minutes,
        },
      });

      this.sendMailProducerService.sendMail({
        email: updateUser.email,
        code: updateUser.account_activation_code,
        type: 'accountActivation',
      });

      return {
        message: 'Foi enviado um código de confirmação para seu e-mail',
      };
    } catch (error) {
      this.logger.error(error);
      this.logger.error(
        `Error when resend activation code admin: ${error.message}`,
        error.stack,
      );
      throw error;
    }
  }
}
