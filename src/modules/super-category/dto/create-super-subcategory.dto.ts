import { ApiProperty } from '@nestjs/swagger';

import { IsNotEmpty } from 'class-validator';

export class CreateSuperCategoryDto {
  @IsNotEmpty({ message: 'validation.SUPER_CATEGORY_EMPTY_TITLE' })
  @ApiProperty({ example: 'Смартфоны & Планшеты' })
  title: string;
}
