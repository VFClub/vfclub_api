import { IsEmail, IsNotEmpty, Matches, MinLength } from 'class-validator';
import { passwordRegEx } from 'src/helpers/regex.helper';

export class RecoveryPasswordUserDto {
  @IsNotEmpty()
  @MinLength(6)
  password_reset_code: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @MinLength(6)
  @Matches(passwordRegEx, {
    message:
      'A senha deve conter no mínimo 6 caracteres, sendo pelo menos 1 letra maiúscula, 1 letra minúscula e 1 número',
  })
  password: string;
}
