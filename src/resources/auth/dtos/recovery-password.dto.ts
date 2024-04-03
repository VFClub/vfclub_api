import { IsNotEmpty, IsString, Matches } from 'class-validator'
import { ConfirmationCodeDto } from './confirmation-code.dto'
import { passwordRegEx } from '@/helpers/regex.helper'
import { ApiProperty } from '@nestjs/swagger'

export class RecoveryPasswordDto extends ConfirmationCodeDto {
  @IsNotEmpty({
    message: 'Filling in the field ( password ) is required',
  })
  @IsString({
    message: 'The password must be a string',
  })
  @Matches(passwordRegEx, {
    message:
      'The password must have at least 8 characters consisting of: numbers, uppercase letters, lowercase letters and special characters.',
  })
  @ApiProperty({
    example: '123456',
    description: 'User password',
  })
  password: string
}
