import { Module } from '@nestjs/common';

// controller
import { AuthController } from './auth.controller';

// service
import { AuthService } from './auth.service';
import { PrismaService } from 'src/prisma/prisma.service';

// module
import { ConfigModule } from '@nestjs/config';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';

// configs
import { JwtModuleRegister } from 'src/utils/configs.utils';

// jwt
import { LocalStrategy } from './strategies/local.strategy';
import { JwtStrategy } from './strategies/jwt.strategy';

@Module({
  imports: [
    ConfigModule.forRoot(),
    PassportModule,
    JwtModule.register(JwtModuleRegister),
  ],
  providers: [
    AuthService,
    PrismaService,
    LocalStrategy,
    JwtModule,
    JwtStrategy,
  ],
  controllers: [AuthController],
})
export class AuthModule {}
