import { PrismaService } from '@/prisma/prisma.service';
import {
  BadRequestException,
  ConflictException,
  Injectable,
  Logger,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compare } from 'bcrypt';
import { addMinutes, isAfter } from 'date-fns';

// services
import { UserSearchService } from '@/SearchDatabaseServices/user.service';

// jobs
import { ConfirmationCodeService } from '@/jobs/send-email/confirmation-code/confirmation-code-service.job';

// utils
import {
  generateConfirmationCode,
  generatePasswordHash,
} from '@/utils/hash.util';

// dtos
import { AuthUserDto } from './dtos/auth-user.dto';
import { ConfirmationCodeDto } from './dtos/confirmation-code.dto';
import { CreateUserDto } from './dtos/create-user.dto';
import { RecoveryPasswordDto } from './dtos/recovery-password.dto';
import { ResendCodeDto } from './dtos/resend-code.dto';

@Injectable()
export class AuthService {
  constructor(
    private prismaService: PrismaService,
    private jwtService: JwtService,
    private confirmationCodeService: ConfirmationCodeService,
    private logger: Logger,
    private userSearchService: UserSearchService,
  ) {}

  async login(data: AuthUserDto) {
    try {
      const user = await this.prismaService.user.findUnique({
        where: {
          email: data.email,
        },
      });

      return {
        access_token: this.jwtService.sign({
          email: data.email,
          id: user.id,
          type: user.type,
        }),
      };
    } catch (error) {
      this.logger.error(error as Error);
      this.logger.error(
        `Error when login: ${(error as Error).message}`,
        (error as Error).stack,
      );
      throw error;
    }
  }

  async validateUser(email: string, password: string) {
    try {
      const user = await this.prismaService.user.findUnique({
        where: {
          email,
        },
      });

      if (!user) {
        return null;
      }

      if (user.is_validated === false) {
        throw new BadRequestException(
          'You must validate your email before you can log in',
        );
      }

      const isPasswordValid = await compare(password, user.password);

      if (!isPasswordValid) {
        return null;
      }

      if (user.password_reset_code) {
        await this.prismaService.user.update({
          where: {
            id: user.id,
          },
          data: {
            password_reset_code: null,
            validation_code_expiration_date: null,
          },
        });
      }

      return user;
    } catch (error) {
      this.logger.error(error as Error);
      this.logger.error(
        `Error when login: ${(error as Error).message}`,
        (error as Error).stack,
      );
      throw error;
    }
  }

  async register(data: CreateUserDto) {
    try {
      await this.userSearchService.userAlreadyExistsByEmail(data.email);

      const confirmationCode = generateConfirmationCode();

      const user = await this.prismaService.user.create({
        data: {
          ...data,
          password: await generatePasswordHash(data.password),
          email_validation_code: confirmationCode,
          validation_code_expiration_date: addMinutes(new Date(), 30), // 30 minutes from now
        },
      });

      await this.confirmationCodeService.handle({
        email: user.email,
        code: confirmationCode,
        type: 'emailConfirmation',
      });

      return {
        user_id: user.id,
        message: 'User created successfully!',
      };
    } catch (error) {
      this.logger.error(error as Error);
      this.logger.error(
        `Error when register: ${(error as Error).message}`,
        (error as Error).stack,
      );
      throw error;
    }
  }

  async activateAccount(data: ConfirmationCodeDto) {
    try {
      const user = await this.userSearchService.userExistsByEmail(data.email);

      if (user.is_validated) {
        throw new ConflictException('The account is already activated');
      }

      if (user.email_validation_code !== data.code) {
        throw new BadRequestException('Invalid confirmation code');
      }

      if (isAfter(new Date(), user.validation_code_expiration_date)) {
        throw new BadRequestException('Confirmation code expired');
      }

      await this.prismaService.user.update({
        where: {
          id: user.id,
        },
        data: {
          is_validated: true,
          email_validation_code: null,
          validation_code_expiration_date: null,
        },
      });

      return {
        message: 'Account successfully activated!',
      };
    } catch (error) {
      this.logger.error(error as Error);
      this.logger.error(
        `Error when activate account: ${(error as Error).message}`,
        (error as Error).stack,
      );
      throw error;
    }
  }

  async resendActivateAccountCode(data: ResendCodeDto) {
    try {
      const user = await this.userSearchService.userExistsByEmail(data.email);

      if (user.is_validated) {
        throw new ConflictException('The account is already activated');
      }

      const confirmationCode = generateConfirmationCode();

      await this.prismaService.user.update({
        where: {
          id: user.id,
        },
        data: {
          email_validation_code: confirmationCode,
          validation_code_expiration_date: addMinutes(new Date(), 30),
        },
      });

      await this.confirmationCodeService.handle({
        email: user.email,
        code: confirmationCode,
        type: 'emailConfirmation',
      });

      return {
        message:
          'A validation code will be sent back to the registered email address!',
      };
    } catch (error) {
      this.logger.error(error as Error);
      this.logger.error(
        `Error when resend activate account code: ${(error as Error).message}`,
        (error as Error).stack,
      );
      throw error;
    }
  }

  async requestRecoveryPassword(data: ResendCodeDto) {
    try {
      const user = await this.userSearchService.userExistsByEmail(data.email);

      if (!user.is_validated) {
        throw new BadRequestException(
          'You must validate your email before you can recover your password',
        );
      }

      const confirmationCode = generateConfirmationCode();

      await this.prismaService.user.update({
        where: {
          id: user.id,
        },
        data: {
          password_reset_code: confirmationCode,
          validation_code_expiration_date: addMinutes(new Date(), 30),
        },
      });

      await this.confirmationCodeService.handle({
        email: user.email,
        code: confirmationCode,
        type: 'passwordConfirmation',
      });

      return {
        message:
          'A validation code will be sent to the registered email address',
      };
    } catch (error) {
      this.logger.error(error as Error);
      this.logger.error(
        `Error when request recovery password: ${(error as Error).message}`,
        (error as Error).stack,
      );
      throw error;
    }
  }

  async recoveryPassword(data: RecoveryPasswordDto) {
    try {
      const user = await this.userSearchService.userExistsByEmail(data.email);

      if (!user.is_validated) {
        throw new BadRequestException(
          'You must validate your email before you can recover your password',
        );
      }

      if (user.password_reset_code !== data.code) {
        throw new BadRequestException('Invalid confirmation code');
      }

      if (isAfter(new Date(), user.validation_code_expiration_date)) {
        throw new BadRequestException('Confirmation code expired');
      }

      await this.prismaService.user.update({
        where: {
          id: user.id,
        },
        data: {
          password: await generatePasswordHash(data.password),
          password_reset_code: null,
          validation_code_expiration_date: null,
        },
      });

      return {
        message: 'Password changed successfully!',
      };
    } catch (error) {
      this.logger.error(error as Error);
      this.logger.error(
        `Error when recovery password: ${(error as Error).message}`,
        (error as Error).stack,
      );
      throw error;
    }
  }
}
