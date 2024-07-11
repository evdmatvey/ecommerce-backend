import { ApiProperty } from '@nestjs/swagger';

import { IsNotEmpty } from 'class-validator';

export class CreateCategoryDto {
  @IsNotEmpty({ message: 'validation.CATEGORY_EMPTY_TITLE' })
  @ApiProperty({ example: 'Ноутбуки' })
  title: string;
}
