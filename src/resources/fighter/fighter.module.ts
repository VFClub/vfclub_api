import { CustomLoggerService } from '@/logger/logger-service.config';
import { Logger, Module } from '@nestjs/common';

// controller
import { FighterController } from './fighter.controller';

// service
import { FighterSearchService } from '@/SearchDatabaseServices/fighter.service';
import { UserSearchService } from '@/SearchDatabaseServices/user.service';
import { PrismaService } from '@/prisma/prisma.service';
import { FighterService } from './fighter.service';

@Module({
  controllers: [FighterController],
  providers: [
    FighterService,
    PrismaService,
    UserSearchService,
    FighterSearchService,
    {
      provide: Logger,
      useClass: CustomLoggerService,
    },
  ],
})
export class FighterModule {}
