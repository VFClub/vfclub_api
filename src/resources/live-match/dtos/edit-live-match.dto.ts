import { ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsDateString,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class EditLiveMatchDto {
  @IsOptional()
  @IsString({
    message: 'The field ( about ) must be a string',
  })
  @ApiPropertyOptional({
    example: 'UFC 269',
    description: 'About the live match',
  })
  about: string;

  @IsOptional()
  @IsDateString(
    {},
    {
      message: 'The field ( start_date ) must be a date string',
    },
  )
  @ApiPropertyOptional({
    example: '2021-12-11T00:00:00.000Z',
    description: 'Start date of the live match',
  })
  start_date: string;

  @IsOptional()
  @IsDateString(
    {},
    {
      message: 'The field ( end_date ) must be a date string',
    },
  )
  @ApiPropertyOptional({
    example: '2021-12-11T00:00:00.000Z',
    description: 'End date of the live match',
  })
  end_date: string;

  @IsNotEmpty({
    message: 'Filling in the field ( user_id ) is required',
  })
  @IsNumber(
    {},
    {
      message: 'The field ( user_id ) must be a number',
    },
  )
  @ApiPropertyOptional({
    example: 1,
    description: 'User ID',
  })
  user_id: number;
}
