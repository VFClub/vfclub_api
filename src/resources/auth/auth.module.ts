import { Logger, Module } from '@nestjs/common';

// controller
import { AuthController } from './auth.controller';

// service
import { PrismaService } from 'src/prisma/prisma.service';
import { AuthService } from './auth.service';

// module
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';

// jwt
// import { LocalStrategy } from './strategies/local.strategy';
import { BullModule } from '@nestjs/bull';
import { JwtStrategy } from './strategies/jwt.strategy';

// configs
import {
  BullModuleRegisterQueue,
  JwtModuleRegister,
  redis,
} from '../../utils/configs.utils';

// mail
import { SendMailConsumer } from 'src/jobs/mail/sendMail-consumer.job';
import { SendMailProducerService } from 'src/jobs/mail/sendMail-producer-service.job';
import { CustomLoggerService } from 'src/logger/logger-service.config';

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
    // LocalStrategy,
    JwtModule,
    JwtStrategy,
    SendMailProducerService,
    SendMailConsumer,
    {
      provide: Logger,
      useClass: CustomLoggerService,
    },
  ],
  controllers: [AuthController],
})
export class AuthModule {}
