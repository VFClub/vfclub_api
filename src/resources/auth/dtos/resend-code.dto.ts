import { ApiProperty } from '@nestjs/swagger'
import { IsEmail, IsNotEmpty, IsString } from 'class-validator'

export class ResendCodeDto {
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
    example: 'jowjohn@email.com',
    description: 'User email',
  })
  email: string
}
