import { CustomLoggerService } from '@/logger/logger-service.config';
import { Logger, Module } from '@nestjs/common';

// controllers
import { LiveMatchController } from './live-match.controller';

// services
import { UserSearchService } from '@/SearchDatabaseServices/user.service';
import { PrismaService } from '@/prisma/prisma.service';
import { LiveMatchService } from './live-match.service';

@Module({
  controllers: [LiveMatchController],
  providers: [
    LiveMatchService,
    PrismaService,
    UserSearchService,
    {
      provide: Logger,
      useClass: CustomLoggerService,
    },
  ],
})
export class LiveMatchModule {}
