import { USER_TYPE } from '@/enum/user_type.enum';
import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsEnum, IsNotEmpty, IsString } from 'class-validator';

export class CreateUserDto {
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

  @IsNotEmpty({
    message: 'Filling in the field ( type ) is required',
  })
  @IsEnum(USER_TYPE, {
    message: `The type must be a valid enum value. Valids: ${Object.values(
      USER_TYPE,
    ).join(', ')}`,
  })
  @ApiProperty({
    example: USER_TYPE.USER,
    description: 'User type',
    enum: USER_TYPE,
  })
  type: USER_TYPE;
}
