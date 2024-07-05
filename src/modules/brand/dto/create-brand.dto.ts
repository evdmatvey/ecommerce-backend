import { ApiProperty } from '@nestjs/swagger';

import { IsNotEmpty } from 'class-validator';

import { ValidationErrors } from '@/constants';

export class CreateBrandDto {
  @IsNotEmpty({ message: ValidationErrors.BRAND_EMPTY_TITLE })
  @ApiProperty({ example: 'Apple' })
  title: string;
}
