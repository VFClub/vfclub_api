import { Logger, Module } from '@nestjs/common';

// controller
import { AuthController } from './auth.controller';

// service
import { PrismaService } from '@/prisma/prisma.service';
import { AuthService } from './auth.service';

// module
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';

// jwt
import { BullModule } from '@nestjs/bull';
import { JwtStrategy } from './strategies/jwt.strategy';
import { LocalStrategy } from './strategies/local.strategy';

// configs
import {
  BullModuleRegisterQueue,
  JwtModuleRegister,
  redis,
} from '../../utils/configs.utils';

// mail

import { UserSearchService } from '@/SearchDatabaseServices/user.service';
import { ConfirmationCodeConsumer } from '@/jobs/send-email/confirmation-code/confirmation-code-consumer.job';
import { ConfirmationCodeService } from '@/jobs/send-email/confirmation-code/confirmation-code-service.job';
import { CustomLoggerService } from '@/logger/logger-service.config';

@Module({
  imports: [
    ConfigModule.forRoot(),
    PassportModule,
    JwtModule.register(JwtModuleRegister),

    BullModule.forRoot({
      redis,
    }),

    BullModule.registerQueue(BullModuleRegisterQueue),
  ],
  providers: [
    AuthService,

    PrismaService,

    LocalStrategy,
    JwtModule,
    JwtStrategy,

    ConfirmationCodeConsumer,
    ConfirmationCodeService,

    UserSearchService,

    {
      provide: Logger,
      useClass: CustomLoggerService,
    },
  ],
  controllers: [AuthController],
})
export class AuthModule {}
