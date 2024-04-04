import { Logger, Module } from '@nestjs/common';

// controllers
import { AdminController } from './admin.controller';

// services
import { UserSearchService } from '@/SearchDatabaseServices/user.service';
import { CustomLoggerService } from '@/logger/logger-service.config';
import { PrismaService } from '@/prisma/prisma.service';
import { AdminService } from './admin.service';

@Module({
  controllers: [AdminController],
  providers: [
    AdminService,
    PrismaService,
    UserSearchService,
    {
      provide: Logger,
      useClass: CustomLoggerService,
    },
  ],
})
export class AdminModule {}
