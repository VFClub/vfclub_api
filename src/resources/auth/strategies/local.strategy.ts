import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';

// service
import { AuthService } from '../auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({ usernameField: 'email' });
  }

  async validate(email: string, password: string, user_type: string) {
    const user = await this.authService.validateUser(
      email,
      password,
      user_type,
    );

    if (!user) {
      throw new UnauthorizedException('Email ou senha incorretos');
    }

    return user;
  }
}
