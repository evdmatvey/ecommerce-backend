import { ApiProperty } from '@nestjs/swagger';

import { IsNotEmpty } from 'class-validator';

export class UpdateSuperSubcategoryDto {
  @IsNotEmpty({ message: 'validation.SUPER_SUBCATEGORY_EMPTY_TITLE' })
  @ApiProperty({ example: 'Смартфоны' })
  title: string;
}
