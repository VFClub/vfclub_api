import { UserSearchService } from '@/SearchDatabaseServices/user.service';
import { USER_TYPE } from '@/enum/user_type.enum';
import { PrismaService } from '@/prisma/prisma.service';
import {
  Injectable,
  Logger,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { AddNewMatchDto } from './dtos/add-new-match.dto';
import { DeleteMatchDto } from './dtos/delete-match.dto';
import { EditMatchDto } from './dtos/edit-match.dto';

@Injectable()
export class MatchService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly userSearchService: UserSearchService,
    private readonly logger: Logger,
  ) {}

  async getMatches() {
    try {
      const matches = await this.prismaService.match.findMany({
        include: {
          participants: {
            select: {
              fighter: true,
            },
          },
        },
      });

      if (matches.length === 0) {
        return [];
      }

      return matches;
    } catch (error) {
      this.logger.error(error as Error);
      this.logger.error(
        `Error when get matches: ${(error as Error).message}`,
        (error as Error).stack,
      );
      throw error;
    }
  }

  async getMatchById(match_id: number) {
    try {
      const match = await this.prismaService.match.findUnique({
        where: {
          id: match_id,
        },
        include: {
          participants: {
            select: {
              fighter: true,
            },
          },
        },
      });

      if (!match) {
        throw new UnauthorizedException('Match not found');
      }

      return match;
    } catch (error) {
      this.logger.error(error as Error);
      this.logger.error(
        `Error when get match by id: ${(error as Error).message}`,
        (error as Error).stack,
      );
      throw error;
    }
  }

  async addNewMatch(data: AddNewMatchDto) {
    try {
      const user = await this.userSearchService.userExistsById(data.created_by);

      if (user.type !== USER_TYPE.ADMIN) {
        throw new UnauthorizedException('User is not authorized to add match');
      }

      const match = await this.prismaService.match.create({
        data: {
          cover_image: data.cover_image,
          title: data.title,
          date: data.date,
          about: data.about,
          created_by: data.created_by,
        },
      });

      await Promise.all(
        data.participants.map((fighterId) =>
          this.prismaService.matchParticipant.create({
            data: {
              match_id: match.id,
              fighter_id: fighterId,
            },
          }),
        ),
      );

      return { message: 'Match added successfully!' };
    } catch (error) {
      this.logger.error(error as Error);
      this.logger.error(
        `Error when add new match: ${(error as Error).message}`,
        (error as Error).stack,
      );
      throw error;
    }
  }

  async updateMatchById(match_id: number, data: EditMatchDto) {
    try {
      const user = await this.userSearchService.userExistsById(data.user_id);

      if (user.type !== USER_TYPE.ADMIN) {
        throw new UnauthorizedException(
          'User is not authorized to update match',
        );
      }

      await this.prismaService.match.update({
        where: {
          id: match_id,
        },
        data: {
          cover_image: data.cover_image,
          title: data.title,
          date: data.date,
          about: data.about,
        },
      });

      return { message: 'Match updated successfully!' };
    } catch (error) {
      this.logger.error(error as Error);
      this.logger.error(
        `Error when update match by id: ${(error as Error).message}`,
        (error as Error).stack,
      );
      throw error;
    }
  }

  async deleteMatchById(match_id: number, data: DeleteMatchDto) {
    try {
      const user = await this.userSearchService.userExistsById(data.user_id);

      if (user.type !== USER_TYPE.ADMIN) {
        throw new UnauthorizedException(
          'User is not authorized to delete match',
        );
      }

      const match = await this.prismaService.match.findUnique({
        where: {
          id: match_id,
        },
      });

      if (!match) {
        throw new NotFoundException('Match not found');
      }

      await this.prismaService.matchParticipant.deleteMany({
        where: {
          match_id,
        },
      });

      await this.prismaService.match.delete({
        where: {
          id: match_id,
        },
      });

      return { message: 'Match deleted successfully!' };
    } catch (error) {
      this.logger.error(error as Error);
      this.logger.error(
        `Error when delete match by id: ${(error as Error).message}`,
        (error as Error).stack,
      );
      throw error;
    }
  }
}
