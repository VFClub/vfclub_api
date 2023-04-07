import { Module } from '@nestjs/common';

import { ConfigModule } from '@nestjs/config';

// modules
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './modules/auth/auth.module';

@Module({
  imports: [ConfigModule.forRoot(), PrismaModule, AuthModule],

  providers: [],
})
export class AppModule {}
