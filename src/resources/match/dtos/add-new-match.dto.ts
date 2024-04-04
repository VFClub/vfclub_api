import { ApiProperty } from '@nestjs/swagger';
import {
  IsArray,
  IsDateString,
  IsNotEmpty,
  IsNumber,
  IsString,
  IsUrl,
} from 'class-validator';

export class AddNewMatchDto {
  @IsNotEmpty({
    message: 'Filling in the field ( cover_image ) is required',
  })
  @IsUrl(
    {},
    {
      message: 'The field ( cover_image ) must be a valid URL',
    },
  )
  @ApiProperty({
    example: 'https://example.com/image.jpg',
    description: 'Match cover image',
  })
  cover_image: string;

  @IsNotEmpty({
    message: 'Filling in the field ( title ) is required',
  })
  @IsString({
    message: 'The field ( title ) must be a string',
  })
  @ApiProperty({
    example: 'Match title',
    description: 'Match title',
  })
  title: string;

  @IsNotEmpty({
    message: 'Filling in the field ( date ) is required',
  })
  @IsDateString(
    {},
    {
      message: 'The field ( date ) must be a valid date',
    },
  )
  @ApiProperty({
    example: '2021-10-10T10:00:00.000Z',
    description: 'Match date',
  })
  date: string;

  @IsNotEmpty({
    message: 'Filling in the field ( about ) is required',
  })
  @IsString({
    message: 'The field ( about ) must be a string',
  })
  @ApiProperty({
    example: 'Match about',
    description: 'Match about',
  })
  about: string;

  @IsNotEmpty({
    message: 'Filling in the field ( participants ) is required',
  })
  @IsArray({
    message: 'The field ( participants ) must be an array',
  })
  @ApiProperty({
    example: [1, 2, 3],
    description: 'Match participants',
  })
  participants: number[];

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
    description: 'Match created by',
  })
  created_by: number;
}
