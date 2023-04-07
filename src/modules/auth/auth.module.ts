import { Module } from '@nestjs/common';

// controller
import { AuthController } from './auth.controller';

// service
import { AuthService } from './auth.service';
import { PrismaService } from 'src/prisma/prisma.service';

// module
import { ConfigModule } from '@nestjs/config';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';

// jwt
import { LocalStrategy } from './strategies/local.strategy';
import { JwtStrategy } from './strategies/jwt.strategy';
import { BullModule } from '@nestjs/bull';

// configs
import {
  redis,
  JwtModuleRegister,
  BullModuleRegisterQueue,
} from '../../utils/configs.utils';

// mail
import { SendMailProducerService } from 'src/jobs/mail/sendMail-producer-service.job';
import { SendMailConsumer } from 'src/jobs/mail/sendMail-consumer.job';

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
    SendMailProducerService,
    SendMailConsumer,
  ],
  controllers: [AuthController],
})
export class AuthModule {}
