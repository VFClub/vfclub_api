import { PrismaService } from '@/prisma/prisma.service';
import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

@Injectable()
export class UserSearchService {
  constructor(private prismaService: PrismaService) {}

  async userExistsByEmail(email: string) {
    const user = await this.prismaService.user.findUnique({
      where: {
        email,
        deleted_at: null,
      },
    });

    if (!user) {
      throw new NotFoundException('User not found by email');
    }

    return user;
  }

  async userExistsById(id: number) {
    const user = await this.prismaService.user.findUnique({
      where: {
        id,
        deleted_at: null,
      },
    });

    if (!user) {
      throw new NotFoundException('User not found by id');
    }

    return user;
  }

  async userAlreadyExistsByEmail(email: string) {
    const user = await this.prismaService.user.findFirst({
      where: {
        email,
        deleted_at: null,
      },
    });

    if (user) {
      throw new ConflictException('User already exists by email');
    }

    return false;
  }
}
