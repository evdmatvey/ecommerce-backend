import { ApiProperty } from '@nestjs/swagger';

import { Category, SuperSubcategory } from '@prisma/client';

import {
  SuperSubcategoryErrors,
  SuperSubcategoryMessages,
  ValidationErrors,
} from '@/constants';
import { CategoryOkResponse } from '@/modules/category';

export class SuperSubcategoryResponse {
  @ApiProperty({ example: '2d23c22c-863d-4774-bb8d-11ffb62c667f' })
  id: string;

  @ApiProperty({ example: 'Смартфоны' })
  title: string;
}

export class SuperSubcategoryWithCategoriesResponse extends SuperSubcategoryResponse {
  @ApiProperty({ type: CategoryOkResponse, isArray: true })
  categories: Category[];
}

export class SuperSubcategoryMessageResponse {
  @ApiProperty({
    example: SuperSubcategoryMessages.SUPER_SUBCATEGORY_DELETE_SUCCESS,
  })
  message: string;
}

export class SuperSubcategoryWithMessageResponse extends SuperSubcategoryMessageResponse {
  @ApiProperty({
    type: SuperSubcategoryResponse,
  })
  superSubcategory: SuperSubcategory;
}

export class SuperSubcategoryBadRequestResponse {
  @ApiProperty({
    example: [ValidationErrors.SUPER_SUBCATEGORY_EMPTY_TITLE],
    isArray: true,
  })
  message: string[];

  @ApiProperty({ example: 'Bad Request' })
  error: string;

  @ApiProperty({ example: 400 })
  statusCode: number;
}

export class SuperSubcategoryConflictResponse {
  @ApiProperty({
    example: SuperSubcategoryErrors.SUPER_SUBCATEGORY_ALREADY_EXIST,
  })
  message: string;

  @ApiProperty({ example: 'Conflict' })
  error: string;

  @ApiProperty({ example: 409 })
  statusCode: number;
}

export class SuperSubcategoryNotFoundResponse {
  @ApiProperty({ example: SuperSubcategoryErrors.SUPER_SUBCATEGORY_NOT_FOUND })
  message: string;

  @ApiProperty({ example: 'Not Found' })
  error: string;

  @ApiProperty({ example: 404 })
  statusCode: number;
}
