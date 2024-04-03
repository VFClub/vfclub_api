import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma/prisma.service';

import { compare } from 'bcrypt';

import { SendMailProducerService } from 'src/jobs/mail/sendMail-producer-service.job';
import { AuthUserDto } from './dtos/auth-user.dto';

@Injectable()
export class AuthService {
  constructor(
    private prismaService: PrismaService,
    private jwtService: JwtService,
    private sendMailProducerService: SendMailProducerService,
    private logger: Logger,
  ) {}

  async login(data: AuthUserDto) {
    console.log(data);

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
      this.logger.error(error);
      this.logger.error(`Error when login: ${error.message}`, error.stack);
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
      this.logger.error(error);
      this.logger.error(
        `Error when validate user: ${error.message}`,
        error.stack,
      );
      throw error;
    }
  }
}
