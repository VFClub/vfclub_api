import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class DeletePartnerDto {
  @IsNotEmpty({
    message: 'Filling in the field ( user_id ) is required',
  })
  @IsNumber(
    {},
    {
      message: 'The field ( user_id ) must be a number',
    },
  )
  @ApiProperty({
    example: 1,
    description: 'User Id',
  })
  user_id: number;
}
