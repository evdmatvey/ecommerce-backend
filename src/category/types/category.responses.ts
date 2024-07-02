import { ApiProperty } from '@nestjs/swagger';

import { Category } from '@prisma/client';

export class CategoryOkResponse {
  @ApiProperty({ example: '51846bf6-1f2a-4d65-85b2-c3e187c4d9ee' })
  id: string;

  @ApiProperty({ example: 'Ноутбуки' })
  title: string;
}

export class CategoryMessageResponse {
  @ApiProperty({ example: 'Категория успешно удалена!' })
  message: string;
}

export class CategoryUpdateResponse extends CategoryMessageResponse {
  @ApiProperty({ type: CategoryOkResponse })
  category: Category;
}

export class CategoryBadRequestResponse {
  @ApiProperty({ example: 'Категория не найдена!' })
  message: string;

  @ApiProperty({ example: 'Bad Request' })
  error: string;

  @ApiProperty({ example: 400 })
  statusCode: number;
}

export class CategoryCreateBadRequestResponse {
  @ApiProperty({ example: 'Укажите название категории!', isArray: true })
  message: string;

  @ApiProperty({ example: 'Bad Request' })
  error: string;

  @ApiProperty({ example: 400 })
  statusCode: number;
}

export class CategoryConflictResponse {
  @ApiProperty({ example: 'Такая категория уже есть в системе!' })
  message: string;

  @ApiProperty({ example: 'Conflict' })
  error: string;

  @ApiProperty({ example: 409 })
  statusCode: number;
}
