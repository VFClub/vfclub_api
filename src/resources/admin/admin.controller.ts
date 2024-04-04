import { Controller, Delete, Param } from '@nestjs/common';
import { AdminService } from './admin.service';

@Controller('/admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Delete('/user/:user_id')
  async disableUser(@Param('user_id') user_id: number) {
    return this.adminService.disableUser(user_id);
  }
}
