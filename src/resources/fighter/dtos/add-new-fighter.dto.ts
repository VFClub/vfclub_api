import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsUrl,
} from 'class-validator';

export class AddNewFighterDto {
  @IsNotEmpty({
    message: 'Filling in the field ( name ) is required',
  })
  @IsString({
    message: 'The value of the field ( name ) must be a string',
  })
  @ApiProperty({
    example: 'John',
    description: 'Fighter first name',
  })
  name: string;

  @IsNotEmpty({
    message: 'Filling in the field ( last_name ) is required',
  })
  @IsString({
    message: 'The value of the field ( last_name ) must be a string',
  })
  @ApiProperty({
    example: 'Doe',
    description: 'Fighter last name',
  })
  last_name: string;

  @IsNotEmpty({
    message: 'Filling in the field ( avatar_url ) is required',
  })
  @IsUrl(
    {},
    {
      message: 'The value of the field ( avatar_url ) must be a URL',
    },
  )
  @ApiProperty({
    example: 'https://avatar.com',
    description: 'Fighter avatar URL',
  })
  avatar_url: string;

  @IsNotEmpty({
    message: 'Filling in the field ( squad ) is required',
  })
  @IsString({
    message: 'The value of the field ( squad ) must be a string',
  })
  @ApiProperty({
    example: 'A',
    description: 'Fighter squad',
  })
  squad: string;

  @IsNotEmpty({
    message: 'Filling in the field ( category ) is required',
  })
  @IsString({
    message: 'The value of the field ( category ) must be a string',
  })
  @ApiProperty({
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
    message: 'Filling in the field ( created_by ) is required',
  })
  @IsNumber(
    {},
    {
      message: 'The value of the field ( created_by ) must be a number',
    },
  )
  @ApiProperty({
    example: 1,
    description: 'User ID',
  })
  created_by: number;
}
