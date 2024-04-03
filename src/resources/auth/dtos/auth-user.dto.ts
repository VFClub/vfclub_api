import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class AuthUserDto {
  @IsNotEmpty({
    message: 'Filling in the field ( email ) is required',
  })
  @IsEmail(
    {},
    {
      message: 'The email must be a valid email address',
    },
  )
  @ApiProperty({
    example: 'joejohn@email.com',
    description: 'User email',
  })
  email: string;

  @IsNotEmpty({
    message: 'Filling in the field ( password ) is required',
  })
  @IsString({
    message: 'The password must be a string',
  })
  @ApiProperty({
    example: '123456',
    description: 'User password',
  })
  password: string;
}
