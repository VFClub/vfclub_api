import { IsEmail, IsNotEmpty } from 'class-validator';

export class RequestRecoveryPasswordUserDto {
  @IsNotEmpty()
  @IsEmail()
  email: string;
}
