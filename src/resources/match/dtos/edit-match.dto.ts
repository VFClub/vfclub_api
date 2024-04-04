import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsDateString,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsUrl,
} from 'class-validator';

export class EditMatchDto {
  @IsOptional()
  @IsUrl(
    {},
    {
      message: 'The field ( cover_image ) must be a valid URL',
    },
  )
  @ApiPropertyOptional({
    example: 'https://example.com/image.jpg',
    description: 'Match cover image',
  })
  cover_image: string;

  @IsOptional()
  @IsString({
    message: 'The field ( title ) must be a string',
  })
  @ApiPropertyOptional({
    example: 'Match title',
    description: 'Match title',
  })
  title: string;

  @IsOptional()
  @IsDateString(
    {},
    {
      message: 'The field ( date ) must be a valid date',
    },
  )
  @ApiPropertyOptional({
    example: '2021-10-10T10:00:00.000Z',
    description: 'Match date',
  })
  date: string;

  @IsOptional()
  @IsString({
    message: 'The field ( about ) must be a string',
  })
  @ApiPropertyOptional({
    example: 'Match about',
    description: 'Match about',
  })
  about: string;

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
    description: 'User ID',
  })
  user_id: number;
}
