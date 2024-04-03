import { MailerModule } from '@nestjs-modules/mailer';
import { Logger, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

// modules
import { AuthModule } from './resources/auth/auth.module';

// configs
import { CustomLoggerService } from './logger/logger-service.config';
import { transport } from './utils/configs.utils';

@Module({
  providers: [
    {
      provide: Logger,
      useClass: CustomLoggerService,
    },
  ],

  imports: [
    ConfigModule.forRoot(),

    MailerModule.forRoot({
      transport,
    }),

    AuthModule,
  ],
})
export class AppModule {}
