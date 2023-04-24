import { IsEmail, IsNotEmpty } from 'class-validator';

export class ActivateAccountAdmDto {
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  account_activation_code: string;
}
