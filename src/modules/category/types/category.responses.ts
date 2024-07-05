import { ApiProperty } from '@nestjs/swagger';

import { Category } from '@prisma/client';

import { CategoryErrors, ValidationErrors } from '@/constants';

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

export class CategoryWithMessageResponse extends CategoryMessageResponse {
  @ApiProperty({ type: CategoryOkResponse })
  category: Category;
}

export class CategoryNotFoundResponse {
  @ApiProperty({ example: CategoryErrors.CATEGORY_NOT_FOUND })
  message: string;

  @ApiProperty({ example: 'Not Found' })
  error: string;

  @ApiProperty({ example: 404 })
  statusCode: number;
}

export class CategoryCreateBadRequestResponse {
  @ApiProperty({
    example: ValidationErrors.CATEGORY_EMPTY_TITLE,
    isArray: true,
  })
  message: string;

  @ApiProperty({ example: 'Bad Request' })
  error: string;

  @ApiProperty({ example: 400 })
  statusCode: number;
}

export class CategoryConflictResponse {
  @ApiProperty({ example: CategoryErrors.CATEGORY_ALREADY_EXIST })
  message: string;

  @ApiProperty({ example: 'Conflict' })
  error: string;

  @ApiProperty({ example: 409 })
  statusCode: number;
}
