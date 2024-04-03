import { Body, Controller, Post, UseGuards } from '@nestjs/common';

import { AuthGuard } from '@nestjs/passport';

// services
import { ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { AuthUserDto } from './dtos/auth-user.dto';
import { CreateUserDto } from './dtos/create-user.dto';

@Controller('/auth')
@ApiTags('Authentication')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(AuthGuard('local'))
  @Post()
  async login(@Body() data: AuthUserDto) {
    return this.authService.login(data);
  }

  @Post('/register')
  async register(@Body() data: CreateUserDto) {
    return this.authService.register(data);
  }
}
