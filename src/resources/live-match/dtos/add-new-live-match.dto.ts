import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class AddNewLiveMatchDto {
  @IsNotEmpty({
    message: 'Filling in the field ( about ) is required',
  })
  @IsString({
    message: 'The field ( about ) must be a string',
  })
  @ApiProperty({
    example: 'UFC 269',
    description: 'About the live match',
  })
  about: string;

  @IsNotEmpty({
    message: 'Filling in the field ( start_date ) is required',
  })
  @IsDateString(
    {},
    {
      message: 'The field ( start_date ) must be a date string',
    },
  )
  @ApiProperty({
    example: '2021-12-11T00:00:00.000Z',
    description: 'Start date of the live match',
  })
  start_date: string;

  @IsNotEmpty({
    message: 'Filling in the field ( end_date ) is required',
  })
  @IsDateString(
    {},
    {
      message: 'The field ( end_date ) must be a date string',
    },
  )
  @ApiProperty({
    example: '2021-12-11T00:00:00.000Z',
    description: 'End date of the live match',
  })
  end_date: string;

  @IsNotEmpty({
    message: 'Filling in the field ( fighter1 ) is required',
  })
  @IsNumber(
    {},
    {
      message: 'The field ( fighter1 ) must be a number',
    },
  )
  @ApiProperty({
    example: 1,
    description: 'Fighter 1',
  })
  fighter1: number;

  @IsNotEmpty({
    message: 'Filling in the field ( fighter2 ) is required',
  })
  @IsNumber(
    {},
    {
      message: 'The field ( fighter2 ) must be a number',
    },
  )
  @ApiProperty({
    example: 2,
    description: 'Fighter 2',
  })
  fighter2: number;

  @IsNotEmpty({
    message: 'Filling in the field ( created_by ) is required',
  })
  @IsNumber(
    {},
    {
      message: 'The field ( created_by ) must be a number',
    },
  )
  @ApiProperty({
    example: 1,
    description: 'Created by',
  })
  created_by: number;
}
