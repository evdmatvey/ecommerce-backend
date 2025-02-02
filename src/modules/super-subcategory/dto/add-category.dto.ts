import { ApiProperty } from '@nestjs/swagger';

import { IsNotEmpty } from 'class-validator';

import { ValidationErrors } from '@/constants';

export class AddCategoryDto {
  @IsNotEmpty({ message: ValidationErrors.CATEGORY_EMPTY_ID })
  @ApiProperty({ example: '851b57dc-2192-42e4-8e5d-98ac8dbbc125' })
  id: string;
}
