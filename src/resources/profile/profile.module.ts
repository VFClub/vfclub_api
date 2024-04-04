import { Logger, Module } from '@nestjs/common';
// controllers
import { ProfileController } from './profile.controller';

// services
import { UserSearchService } from '@/SearchDatabaseServices/user.service';
import { CustomLoggerService } from '@/logger/logger-service.config';
import { PrismaService } from '@/prisma/prisma.service';
import { ProfileService } from './profile.service';

@Module({
  providers: [
    ProfileService,
    PrismaService,
    UserSearchService,

    {
      provide: Logger,
      useClass: CustomLoggerService,
    },
  ],

  controllers: [ProfileController],
})
export class ProfileModule {}
