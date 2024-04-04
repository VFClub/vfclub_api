import { UserSearchService } from '@/SearchDatabaseServices/user.service';
import { USER_TYPE } from '@/enum/user_type.enum';
import { PrismaService } from '@/prisma/prisma.service';
import {
  Injectable,
  Logger,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { AddNewLiveMatchDto } from './dtos/add-new-live-match.dto';
import { DeleteLiveMatchDto } from './dtos/delete-live-match.dto';
import { EditLiveMatchDto } from './dtos/edit-live-match.dto';

@Injectable()
export class LiveMatchService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly userSearchService: UserSearchService,
    private readonly logger: Logger,
  ) {}

  async getLiveMatches() {
    try {
      const liveMatches = await this.prismaService.liveMatch.findMany({
        include: {
          fighter1_id: true,
          fighter2_id: true,
        },

        orderBy: {
          start_date: 'asc',
        },
      });

      if (liveMatches.length === 0) {
        return [];
      }

      return liveMatches;
    } catch (error) {
      this.logger.error(error as Error);
      this.logger.error(
        `Error when get live matches: ${(error as Error).message}`,
        (error as Error).stack,
      );
      throw error;
    }
  }

  async getLiveMatchById(live_match_id: number) {
    try {
      const liveMatch = await this.prismaService.liveMatch.findFirst({
        where: {
          id: live_match_id,
        },

        include: {
          fighter1_id: true,
          fighter2_id: true,
        },

        orderBy: {
          start_date: 'asc',
        },
      });

      if (!liveMatch) {
        throw new NotFoundException('Live match not found');
      }

      return liveMatch;
    } catch (error) {
      this.logger.error(error as Error);
      this.logger.error(
        `Error when get live match by id: ${(error as Error).message}`,
        (error as Error).stack,
      );
      throw error;
    }
  }

  async addNewLiveMatch(data: AddNewLiveMatchDto) {
    try {
      const user = await this.userSearchService.userExistsById(data.created_by);
      if (user.type !== USER_TYPE.ADMIN) {
        throw new UnauthorizedException(
          'User is not authorized to add live match',
        );
      }

      const fightersExistsById = await this.prismaService.fighter.findMany({
        where: {
          id: {
            in: [data.fighter1, data.fighter2],
          },
        },
      });

      if (fightersExistsById.length !== 2) {
        throw new NotFoundException('Fighters not found');
      }

      const liveMatch = await this.prismaService.liveMatch.create({
        data,
      });

      return {
        live_match_id: liveMatch.id,
        message: 'Live match added successfully!',
      };
    } catch (error) {
      this.logger.error(error as Error);
      this.logger.error(
        `Error when add new live match: ${(error as Error).message}`,
        (error as Error).stack,
      );
      throw error;
    }
  }

  async updateLiveMatchById(live_match_id: number, data: EditLiveMatchDto) {
    try {
      const user = await this.userSearchService.userExistsById(data.user_id);
      if (user.type !== USER_TYPE.ADMIN) {
        throw new UnauthorizedException(
          'User is not authorized to update live match',
        );
      }

      const liveMatch = await this.prismaService.liveMatch.findUnique({
        where: {
          id: live_match_id,
        },
      });

      if (!liveMatch) {
        throw new NotFoundException('Live match not found');
      }

      await this.prismaService.liveMatch.update({
        where: {
          id: live_match_id,
        },
        data: {
          about: data.about,
          start_date: data.start_date,
          end_date: data.end_date,
        },
      });

      return {
        message: 'Live match updated successfully!',
      };
    } catch (error) {
      this.logger.error(error as Error);
      this.logger.error(
        `Error when update live match: ${(error as Error).message}`,
        (error as Error).stack,
      );
      throw error;
    }
  }

  async deleteLiveMatchById(live_match_id: number, data: DeleteLiveMatchDto) {
    try {
      const user = await this.userSearchService.userExistsById(data.user_id);
      if (user.type !== USER_TYPE.ADMIN) {
        throw new UnauthorizedException(
          'User is not authorized to delete live match',
        );
      }

      const liveMatch = await this.prismaService.liveMatch.findUnique({
        where: {
          id: live_match_id,
        },
      });

      if (!liveMatch) {
        throw new NotFoundException('Live match not found');
      }

      await this.prismaService.liveMatch.delete({
        where: {
          id: live_match_id,
        },
      });

      return {
        message: 'Live match deleted successfully!',
      };
    } catch (error) {
      this.logger.error(error as Error);
      this.logger.error(
        `Error when delete live match: ${(error as Error).message}`,
        (error as Error).stack,
      );
      throw error;
    }
  }
}
