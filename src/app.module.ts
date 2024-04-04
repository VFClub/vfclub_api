import { MailerModule } from '@nestjs-modules/mailer';
import { Logger, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

// modules
import { AdminModule } from './resources/admin/admin.module';
import { AuthModule } from './resources/auth/auth.module';
import { FighterModule } from './resources/fighter/fighter.module';
import { LiveMatchModule } from './resources/live-match/live-match.module';
import { PartnerModule } from './resources/partner/partner.module';
import { ProfileModule } from './resources/profile/profile.module';

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
    ProfileModule,
    AdminModule,
    PartnerModule,
    FighterModule,
    LiveMatchModule,
  ],
})
export class AppModule {}
