import { Body, Controller, Get, Param, Patch, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags } from '@nestjs/swagger';
import { UpdateProfileDto } from './dtos/update-profile.dto';
import { ProfileService } from './profile.service';

@Controller('/profile')
@ApiTags('User Profile')
@UseGuards(AuthGuard('jwt'))
export class ProfileController {
  constructor(private profileService: ProfileService) {}

  @Get('/:user_id')
  async getProfile(@Param('user_id') user_id: number) {
    return this.profileService.getProfile(user_id);
  }

  @Patch('/:user_id')
  async updateProfile(
    @Param('user_id') user_id: number,
    @Body() data: UpdateProfileDto,
  ) {
    return this.profileService.updateProfile(user_id, data);
  }
}
