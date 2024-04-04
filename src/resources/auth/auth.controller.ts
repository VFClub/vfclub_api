import { Body, Controller, Post, UseGuards } from '@nestjs/common';

import { AuthGuard } from '@nestjs/passport';

// services
import { ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';

// dtos
import { AuthUserDto } from './dtos/auth-user.dto';
import { ConfirmationCodeDto } from './dtos/confirmation-code.dto';
import { CreateUserDto } from './dtos/create-user.dto';
import { RecoveryPasswordDto } from './dtos/recovery-password.dto';
import { ResendCodeDto } from './dtos/resend-code.dto';

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

  @Post('/activate-account')
  async activateAccount(@Body() data: ConfirmationCodeDto) {
    return this.authService.activateAccount(data);
  }

  @Post('/resend-activate-account-code')
  async resendActivateAccountCode(@Body() data: ResendCodeDto) {
    return this.authService.resendActivateAccountCode(data);
  }

  @Post('/request-recovery-password')
  async requestRecoveryPassword(@Body() data: ResendCodeDto) {
    return this.authService.requestRecoveryPassword(data);
  }

  @Post('/recovery-password')
  async recoveryPassword(@Body() data: RecoveryPasswordDto) {
    return this.authService.recoveryPassword(data);
  }
}
