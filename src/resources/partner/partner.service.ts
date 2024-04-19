import {
  ConflictException,
  Injectable,
  Logger,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';

// services
import { UserSearchService } from '@/SearchDatabaseServices/user.service';
import { USER_TYPE } from '@/enum/user_type.enum';
import { PrismaService } from '@/prisma/prisma.service';
import { AddNewPartnerDto } from './dtos/add-new-partner.dto';
import { DeletePartnerDto } from './dtos/delete-partner.dto';

@Injectable()
export class PartnerService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly userSearchService: UserSearchService,
    private readonly logger: Logger,
  ) {}

  async getPartners() {
    try {
      const partners = await this.prismaService.partner.findMany();

      if (partners.length === 0) {
        return [];
      }

      return partners;
    } catch (error) {
      this.logger.error(error as Error);
      this.logger.error(
        `Error when get partners: ${(error as Error).message}`,
        (error as Error).stack,
      );
      throw error;
    }
  }

  async getPartnerById(partner_id: number) {
    try {
      const partner = await this.prismaService.partner.findUnique({
        where: {
          id: partner_id,
        },
      });

      if (!partner) {
        throw new NotFoundException('Partner not found');
      }

      return partner;
    } catch (error) {
      this.logger.error(error as Error);
      this.logger.error(
        `Error when get partner by id: ${(error as Error).message}`,
        (error as Error).stack,
      );
      throw error;
    }
  }

  async addNewPartner(data: AddNewPartnerDto) {
    try {
      const user = await this.userSearchService.userExistsById(data.created_by);

      if (user.type !== USER_TYPE.ADMIN) {
        throw new UnauthorizedException(
          'User is not authorized to add partner',
        );
      }

      const partnerAlreadyExistsByAccessLink =
        await this.prismaService.partner.findFirst({
          where: {
            access_link: data.access_link,
          },
        });

      if (partnerAlreadyExistsByAccessLink) {
        throw new ConflictException('Partner already exists');
      }

      const partner = await this.prismaService.partner.create({
        data,
      });

      return {
        partner_id: partner.id,
        message: 'Partner added successfully',
      };
    } catch (error) {
      this.logger.error(error as Error);
      this.logger.error(
        `Error when add new partner: ${(error as Error).message}`,
        (error as Error).stack,
      );
      throw error;
    }
  }

  async updatePartner(partner_id: number, data: AddNewPartnerDto) {
    try {
      const user = await this.userSearchService.userExistsById(data.created_by);

      if (user.type !== USER_TYPE.ADMIN) {
        throw new UnauthorizedException(
          'User is not authorized to update partner',
        );
      }

      const partner = await this.prismaService.partner.findUnique({
        where: {
          id: partner_id,
        },
      });

      if (!partner) {
        throw new NotFoundException('Partner not found');
      }

      if (partner.access_link === data.access_link) {
        throw new ConflictException('Access link already exists');
      }

      await this.prismaService.partner.update({
        where: {
          id: partner_id,
        },
        data,
      });

      return {
        message: 'Partner updated successfully',
      };
    } catch (error) {
      this.logger.error(error as Error);
      this.logger.error(
        `Error when update partner: ${(error as Error).message}`,
        (error as Error).stack,
      );
      throw error;
    }
  }

  async deletePartner(partner_id: number, data: DeletePartnerDto) {
    try {
      const user = await this.userSearchService.userExistsById(data.user_id);

      if (user.type !== USER_TYPE.ADMIN) {
        throw new UnauthorizedException(
          'User is not authorized to delete partner',
        );
      }

      const partner = await this.prismaService.partner.findUnique({
        where: {
          id: partner_id,
        },
      });

      if (!partner) {
        throw new NotFoundException('Partner not found');
      }

      await this.prismaService.partner.delete({
        where: {
          id: partner_id,
        },
      });

      return {
        message: 'Partner deleted successfully',
      };
    } catch (error) {
      this.logger.error(error as Error);
      this.logger.error(
        `Error when delete partner: ${(error as Error).message}`,
        (error as Error).stack,
      );
      throw error;
    }
  }
}
