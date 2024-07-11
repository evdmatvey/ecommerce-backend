import { ApiProperty } from '@nestjs/swagger';

import { IsNotEmpty } from 'class-validator';

export class UpdateSuperCategoryDto {
  @IsNotEmpty({ message: 'validation.SUPER_CATEGORY_EMPTY_TITLE' })
  @ApiProperty({ example: 'Смартфоны & Ноутбуки' })
  title: string;
}
