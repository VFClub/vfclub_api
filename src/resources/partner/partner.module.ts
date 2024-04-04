import { Logger, Module } from '@nestjs/common';

// controller
import { PartnerController } from './partner.controller';

// services
import { UserSearchService } from '@/SearchDatabaseServices/user.service';
import { CustomLoggerService } from '@/logger/logger-service.config';
import { PrismaService } from '@/prisma/prisma.service';
import { PartnerService } from './partner.service';

@Module({
  controllers: [PartnerController],
  providers: [
    PartnerService,
    PrismaService,
    UserSearchService,
    {
      provide: Logger,
      useClass: CustomLoggerService,
    },
  ],
})
export class PartnerModule {}
