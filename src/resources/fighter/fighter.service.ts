import { FighterSearchService } from '@/SearchDatabaseServices/fighter.service';
import { UserSearchService } from '@/SearchDatabaseServices/user.service';
import { USER_TYPE } from '@/enum/user_type.enum';
import { PrismaService } from '@/prisma/prisma.service';
import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { AddNewFighterDto } from './dtos/add-new-fighter.dto';
import { DeleteFighterDto } from './dtos/delete-fighter.dto';
import { EditFighterDto } from './dtos/edit-fighter.dto';

@Injectable()
export class FighterService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly userSearchService: UserSearchService,
    private readonly fighterSearchService: FighterSearchService,
    private readonly logger: Logger,
  ) {}

  async getFighters() {
    try {
      const fighters = await this.prismaService.fighter.findMany({
        select: {
          id: true,
          name: true,
          last_name: true,
          avatar_url: true,
          squad: true,
          category: true,
          points: true,
        },
      });

      if (fighters.length === 0) {
        return [];
      }

      return fighters;
    } catch (error) {
      this.logger.error(error as Error);
      this.logger.error(
        `Error when // get fighters //: ${(error as Error).message}`,
        (error as Error).stack,
      );
      throw error;
    }
  }

  async getFighterById(fighter_id: number) {
    try {
      const fighter = await this.fighterSearchService.fighterExistsById(
        fighter_id,
      );

      return fighter;
    } catch (error) {
      this.logger.error(error as Error);
      this.logger.error(
        `Error when get fighter by id: ${(error as Error).message}`,
        (error as Error).stack,
      );
      throw error;
    }
  }

  async addNewFighter(data: AddNewFighterDto) {
    try {
      const user = await this.userSearchService.userExistsById(data.created_by);

      if (user.type !== USER_TYPE.ADMIN) {
        throw new UnauthorizedException('Only admin can add new fighter');
      }

      const fighter = await this.prismaService.fighter.create({
        data,
      });

      return {
        fighter_id: fighter.id,
        message: 'Fighter added successfully!',
      };
    } catch (error) {
      this.logger.error(error as Error);
      this.logger.error(
        `Error when add new fighter: ${(error as Error).message}`,
        (error as Error).stack,
      );
      throw error;
    }
  }

  async updateFighter(fighter_id: number, data: EditFighterDto) {
    try {
      const user = await this.userSearchService.userExistsById(data.user_id);

      if (user.type !== USER_TYPE.ADMIN) {
        throw new UnauthorizedException('Only admin can update fighter');
      }

      await this.fighterSearchService.fighterExistsById(fighter_id);

      await this.prismaService.fighter.update({
        where: {
          id: fighter_id,
        },
        data: {
          name: data.name,
          last_name: data.last_name,
          avatar_url: data.avatar_url,
          squad: data.squad,
          category: data.category,
          points: data.points,
        },
      });

      return {
        message: 'Fighter updated successfully!',
      };
    } catch (error) {
      this.logger.error(error as Error);
      this.logger.error(
        `Error when update fighter: ${(error as Error).message}`,
        (error as Error).stack,
      );
      throw error;
    }
  }

  async deleteFighter(fighter_id: number, data: DeleteFighterDto) {
    try {
      const user = await this.userSearchService.userExistsById(data.user_id);

      if (user.type !== USER_TYPE.ADMIN) {
        throw new UnauthorizedException('Only admin can delete fighter');
      }

      await this.fighterSearchService.fighterExistsById(fighter_id);

      await this.prismaService.fighter.delete({
        where: {
          id: fighter_id,
        },
      });

      return {
        message: 'Fighter deleted successfully!',
      };
    } catch (error) {
      this.logger.error(error as Error);
      this.logger.error(
        `Error when delete fighter: ${(error as Error).message}`,
        (error as Error).stack,
      );
      throw error;
    }
  }
}
