import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsUrl } from 'class-validator';

export class EditPartnerDto {
  @IsOptional()
  @IsUrl(
    {},
    {
      message: 'The field ( avatar_url ) must be a valid URL',
    },
  )
  @ApiPropertyOptional({
    example: 'https://www.google.com',
    description: 'Avatar URL of the partner',
  })
  avatar_url: string;

  @IsOptional()
  @IsUrl(
    {},
    {
      message: 'The field ( access_link ) must be a valid URL',
    },
  )
  @ApiPropertyOptional({
    example: 'https://www.google.com',
    description: 'Access link to the partner website',
  })
  access_link: string;

  @IsOptional()
  @IsNumber(
    {},
    {
      message: 'The field ( created_by ) must be a number',
    },
  )
  @ApiPropertyOptional({
    example: 1,
    description: 'User Id who created the partner',
  })
  created_by: number;
}
