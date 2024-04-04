import { Controller, Delete, Param, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags } from '@nestjs/swagger';
import { AdminService } from './admin.service';

@Controller('/admin')
@ApiTags('Admin')
@UseGuards(AuthGuard('jwt'))
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Delete('/user/:user_id')
  async disableUser(@Param('user_id') user_id: number) {
    return this.adminService.disableUser(user_id);
  }
}
