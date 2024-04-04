import { UserSearchService } from '@/SearchDatabaseServices/user.service';
import { PrismaService } from '@/prisma/prisma.service';
import { Injectable, Logger } from '@nestjs/common';
import { UpdateProfileDto } from './dtos/update-profile.dto';

@Injectable()
export class ProfileService {
  constructor(
    private prismaService: PrismaService,
    private userSearchService: UserSearchService,
    private logger: Logger,
  ) {}

  async getProfile(user_id: number) {
    try {
      await this.userSearchService.userExistsById(user_id);

      const user = await this.prismaService.user.findUnique({
        where: {
          id: user_id,
        },

        select: {
          id: true,
          email: true,
          name: true,
          last_name: true,
          avatar_url: true,
          type: true,
        },
      });

      return { user };
    } catch (error) {
      this.logger.error(error as Error);
      this.logger.error(
        `Error when get profile data: ${(error as Error).message}`,
        (error as Error).stack,
      );
      throw error;
    }
  }

  async updateProfile(user_id: number, data: UpdateProfileDto) {
    try {
      await this.userSearchService.userExistsById(user_id);

      await this.prismaService.user.update({
        where: {
          id: user_id,
        },
        data: {
          ...data,
        },
      });

      return {
        message: 'Profile updated successfully!',
      };
    } catch (error) {
      this.logger.error(error as Error);
      this.logger.error(
        `Error when update profile data: ${(error as Error).message}`,
        (error as Error).stack,
      );
      throw error;
    }
  }
}
