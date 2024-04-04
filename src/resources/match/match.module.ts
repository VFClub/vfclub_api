import { CustomLoggerService } from '@/logger/logger-service.config';
import { Logger, Module } from '@nestjs/common';

// controllers
import { MatchController } from './match.controller';

// services
import { UserSearchService } from '@/SearchDatabaseServices/user.service';
import { PrismaService } from '@/prisma/prisma.service';
import { MatchService } from './match.service';

@Module({
  controllers: [MatchController],
  providers: [
    MatchService,
    PrismaService,
    UserSearchService,
    {
      provide: Logger,
      useClass: CustomLoggerService,
    },
  ],
})
export class MatchModule {}
