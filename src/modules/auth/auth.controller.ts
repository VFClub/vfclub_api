import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { IUserProps } from 'src/@types';
import { CreatePlayerDto } from './dtos/create-player.dto';
import { RequestRecoveryPasswordUserDto } from './dtos/request-recovery-password-user.dto';
import { RecoveryPasswordUserDto } from './dtos/recovery-password-user.dto';
import { ActivateAccountAdmDto } from './dtos/activate-account.sto';
import { CreateAdminDto } from './dtos/create-admin.dto';

@Controller('/auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(AuthGuard('local'))
  @Post()
  async login(@Body() data: IUserProps) {
    return this.authService.login(data);
  }

  @Post('/register')
  async register(@Body() data: CreatePlayerDto) {
    return this.authService.registerPlayer(data);
  }

  @Post('/register/admin')
  async registerAdmin(@Body() data: CreateAdminDto) {
    return this.authService.registerAdmin(data);
  }

  @Post('/request-recovery-password')
  async requestRecoveryPassword(@Body() data: RequestRecoveryPasswordUserDto) {
    return this.authService.requestRecoveryPassword(data);
  }

  @Post('/recovery-password')
  async recoveryPassword(@Body() data: RecoveryPasswordUserDto) {
    return this.authService.recoveryPassword(data);
  }

  @Post('/activate-account/admin')
  async activateAccountAdmin(@Body() data: ActivateAccountAdmDto) {
    return this.authService.activateAccountAdmin(data);
  }

  @Post('/resend-activation-code/admin')
  async resendActivationCodeAdmin(@Body() data: { email: string }) {
    return this.authService.resendActivationCodeAdmin(data);
  }
}
