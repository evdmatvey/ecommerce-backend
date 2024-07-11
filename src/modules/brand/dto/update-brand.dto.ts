import { ApiProperty } from '@nestjs/swagger';

import { IsNotEmpty } from 'class-validator';

export class UpdateBrandDto {
  @IsNotEmpty({ message: 'validation.BRAND_EMPTY_TITLE' })
  @ApiProperty({ example: 'Samsung' })
  title: string;
}
