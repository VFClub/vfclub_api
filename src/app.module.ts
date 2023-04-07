import { Module } from '@nestjs/common';

import { ConfigModule } from '@nestjs/config';

// modules
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './modules/auth/auth.module';
import { MailerModule } from '@nestjs-modules/mailer';

// configs
import { transport } from './utils/configs.utils';

@Module({
  imports: [
    ConfigModule.forRoot(),
    PrismaModule,
    AuthModule,
    MailerModule.forRoot({
      transport,
    }),
  ],

  providers: [],
})
export class AppModule {}
