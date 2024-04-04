import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class DeleteFighterDto {
  @IsNotEmpty({
    message: 'Filling in the field ( user_id ) is required',
  })
  @IsNumber(
    {},
    {
      message: 'The value of the field ( user_id ) must be a number',
    },
  )
  @ApiProperty({
    example: 1,
    description: 'User ID',
  })
  user_id: number;
}