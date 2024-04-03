import { PrismaService } from '@/prisma/prisma.service';
import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compare } from 'bcrypt';
import { addMinutes } from 'date-fns';

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
import { CreateUserDto } from './dtos/create-user.dto';

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
}
