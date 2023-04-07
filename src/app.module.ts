import { Logger, Module } from '@nestjs/common';

import { ConfigModule } from '@nestjs/config';

// modules
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './modules/auth/auth.module';
import { MailerModule } from '@nestjs-modules/mailer';

// configs
import { transport } from './utils/configs.utils';
import { CustomLoggerService } from './logger/logger-service.config';

@Module({
  imports: [
    ConfigModule.forRoot(),
    PrismaModule,
    AuthModule,
    MailerModule.forRoot({
      transport,
    }),
  ],

  providers: [
    {
      provide: Logger,
      useClass: CustomLoggerService,
    },
  ],
})
export class AppModule {}
