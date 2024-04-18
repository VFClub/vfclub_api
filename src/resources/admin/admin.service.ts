import { UserSearchService } from '@/SearchDatabaseServices/user.service';
import { USER_TYPE } from '@/enum/user_type.enum';
import { PrismaService } from '@/prisma/prisma.service';
import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class AdminService {
  constructor(
    private prismaService: PrismaService,
    private userSearchService: UserSearchService,
    private logger: Logger,
  ) {}

  async getUsers() {
    try {
      const users = await this.prismaService.user.findMany({
        where: {
          type: USER_TYPE.ADMIN,
        },
      });

      if (!users) {
        return [];
      }

      return users;
    } catch (error) {
      this.logger.error(error as Error);
      this.logger.error(
        `Error when login: ${(error as Error).message}`,
        (error as Error).stack,
      );
      throw error;
    }
  }

  async disableUser(user_id: number) {
    try {
      await this.userSearchService.userExistsById(user_id);

      await this.prismaService.user.update({
        where: {
          id: user_id,
        },
        data: {
          deleted_at: new Date(),
        },
      });

      return {
        message: 'User disabled successfully',
      };
    } catch (error) {
      this.logger.error(error as Error);
      this.logger.error(
        `Error when login: ${(error as Error).message}`,
        (error as Error).stack,
      );
      throw error;
    }
  }
}
