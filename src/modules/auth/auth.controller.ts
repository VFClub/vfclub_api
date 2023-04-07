import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { IUserProps } from 'src/@types';
import { CreateUserDto } from './dtos/create-user.dto';
import { RequestRecoveryPasswordUserDto } from './dtos/request-recovery-password-user.dto';
import { RecoveryPasswordUserDto } from './dtos/recovery-password-user.dto';

@Controller('/auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(AuthGuard('local'))
  @Post()
  async login(@Body() data: IUserProps) {
    return this.authService.login(data);
  }

  @Post('/register')
  async register(@Body() data: CreateUserDto) {
    return this.authService.register(data);
  }

  @Post('/request-recovery-password')
  async requestRecoveryPassword(@Body() data: RequestRecoveryPasswordUserDto) {
    return this.authService.requestRecoveryPassword(data);
  }

  @Post('/recovery-password')
  async recoveryPassword(@Body() data: RecoveryPasswordUserDto) {
    return this.authService.recoveryPassword(data);
  }
}
