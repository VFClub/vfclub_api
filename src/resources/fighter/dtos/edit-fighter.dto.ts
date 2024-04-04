import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsUrl,
} from 'class-validator';

export class EditFighterDto {
  @IsOptional()
  @IsString({
    message: 'The value of the field ( name ) must be a string',
  })
  @ApiPropertyOptional({
    example: 'John',
    description: 'Fighter first name',
  })
  name: string;

  @IsOptional()
  @IsString({
    message: 'The value of the field ( last_name ) must be a string',
  })
  @ApiPropertyOptional({
    example: 'Doe',
    description: 'Fighter last name',
  })
  last_name: string;

  @IsOptional()
  @IsUrl(
    {},
    {
      message: 'The value of the field ( avatar_url ) must be a URL',
    },
  )
  @ApiPropertyOptional({
    example: 'https://avatar.com',
    description: 'Fighter avatar URL',
  })
  avatar_url: string;

  @IsOptional()
  @IsString({
    message: 'The value of the field ( squad ) must be a string',
  })
  @ApiPropertyOptional({
    example: 'A',
    description: 'Fighter squad',
  })
  squad: string;

  @IsOptional()
  @IsString({
    message: 'The value of the field ( category ) must be a string',
  })
  @ApiPropertyOptional({
    example: 'B',
    description: 'Fighter category',
  })
  category: string;

  @IsOptional()
  @IsNumber(
    {},
    {
      message: 'The value of the field ( points ) must be a number',
    },
  )
  @ApiPropertyOptional({
    example: 100,
    description: 'Fighter points',
  })
  points: number;

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
