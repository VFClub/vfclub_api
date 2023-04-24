import { IsEmail, IsNotEmpty, Matches, MinLength } from 'class-validator';
import {
  fullNameRegEx,
  passwordRegEx,
  phoneRegEx,
} from 'src/helpers/regex.helper';

export class CreateAdmDto {
  @IsNotEmpty()
  user_type: string;

  @IsNotEmpty()
  @Matches(fullNameRegEx, {
    message:
      'O campo nome deve ser preenchido com o nome completo, contendo nome e sobrenome',
  })
  name: string;

  @IsNotEmpty()
  @Matches(phoneRegEx, {
    message:
      'O campo telefone deve ser preenchido com o DDD e o número de celular',
  })
  phone: string;

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

  @IsNotEmpty()
  created_by: number;
}
