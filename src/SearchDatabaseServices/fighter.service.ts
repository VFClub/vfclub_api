import { PrismaService } from '@/prisma/prisma.service';
import { Injectable, NotFoundException } from '@nestjs/common';

@Injectable()
export class FighterSearchService {
  constructor(private prismaService: PrismaService) {}

  async fighterExistsById(id: number) {
    const fighter = await this.prismaService.fighter.findUnique({
      where: {
        id,
      },
    });

    if (!fighter) {
      throw new NotFoundException('Fighter not found by id');
    }

    return fighter;
  }
}
