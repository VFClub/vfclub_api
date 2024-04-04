import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsUrl } from 'class-validator';

export class AddNewPartnerDto {
  @IsNotEmpty({
    message: 'Filling in the field ( avatar_url ) is required',
  })
  @IsUrl(
    {},
    {
      message: 'The field ( avatar_url ) must be a valid URL',
    },
  )
  @ApiProperty({
    example: 'https://www.google.com',
    description: 'Avatar URL of the partner',
  })
  avatar_url: string;

  @IsNotEmpty({
    message: 'Filling in the field ( access_link ) is required',
  })
  @IsUrl(
    {},
    {
      message: 'The field ( access_link ) must be a valid URL',
    },
  )
  @ApiProperty({
    example: 'https://www.google.com',
    description: 'Access link to the partner website',
  })
  access_link: string;

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
    description: 'User Id who created the partner',
  })
  created_by: number;
}
