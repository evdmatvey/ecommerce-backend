import { ApiProperty } from '@nestjs/swagger';

import { IsNotEmpty } from 'class-validator';

export class CreateBrandDto {
  @IsNotEmpty({ message: 'validation.BRAND_EMPTY_TITLE' })
  @ApiProperty({ example: 'Apple' })
  title: string;
}
