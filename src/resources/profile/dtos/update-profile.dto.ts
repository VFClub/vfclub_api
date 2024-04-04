import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString, IsUrl } from 'class-validator';

export class UpdateProfileDto {
  @IsOptional()
  @IsUrl(
    {},
    {
      message: 'The field ( avatar_url ) must be a valid URL',
    },
  )
  @ApiPropertyOptional({
    example: 'https://example.com/avatar.jpg',
    description: 'User avatar URL',
  })
  avatar_url: string;

  @IsOptional()
  @IsString({
    message: 'The field ( name ) must be a string',
  })
  @ApiPropertyOptional({
    example: 'John',
    description: 'User first name',
  })
  name: string;

  @IsOptional()
  @IsString({
    message: 'The field ( last_name ) must be a string',
  })
  @ApiPropertyOptional({
    example: 'Doe',
    description: 'User last name',
  })
  last_name: string;
}
