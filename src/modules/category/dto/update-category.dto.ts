import { ApiProperty } from '@nestjs/swagger';

import { IsNotEmpty } from 'class-validator';

export class UpdateCategoryDto {
  @IsNotEmpty({ message: 'validation.CATEGORY_EMPTY_TITLE' })
  @ApiProperty({ example: 'Смартфоны' })
  title: string;
}
