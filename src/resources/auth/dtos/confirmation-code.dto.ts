import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class ConfirmationCodeDto {
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
    message: 'Filling in the field ( code ) is required',
  })
  @IsString({
    message: 'The code must be a string',
  })
  @ApiProperty({
    example: '123456',
    description: 'Confirmation code',
  })
  code: string;
}
