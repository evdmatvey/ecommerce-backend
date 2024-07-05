import { ApiProperty } from '@nestjs/swagger';

import { SuperCategory, SuperSubcategory } from '@prisma/client';

import {
  SuperCategoryErrors,
  SuperCategoryMessages,
  ValidationErrors,
} from '@/constants';
import { CategoryOkResponse } from '@/modules/category';
import { SuperSubcategoryWithCategoriesResponse } from '@/modules/super-subcategory/types/super-subcategory.responses';

export class SuperCategoryResponse {
  @ApiProperty({ example: '2d23c22c-863d-4774-bb8d-11ffb62c667f' })
  id: string;

  @ApiProperty({ example: 'Смартфоны & планшеты' })
  title: string;
}

export class SuperCategoryWithSubcategoriesResponse extends SuperCategoryResponse {
  @ApiProperty({ type: CategoryOkResponse, isArray: true })
  subcategories: SuperSubcategory[];
}

export class SuperCategoryFullResponse extends SuperCategoryResponse {
  @ApiProperty({ type: SuperSubcategoryWithCategoriesResponse, isArray: true })
  subcategories: SuperSubcategory[];
}

export class SuperCategoryMessageResponse {
  @ApiProperty({
    type: SuperCategoryResponse,
  })
  superCategory: SuperCategory;
}

export class SuperCategoryWithMessageResponse extends SuperCategoryMessageResponse {
  @ApiProperty({
    example: SuperCategoryMessages.SUPER_CATEGORY_ADD_SUBCATEGORY_SUCCESS,
  })
  message: string;
}

export class SuperCategoryBadRequestResponse {
  @ApiProperty({
    example: [ValidationErrors.SUPER_CATEGORY_EMPTY_TITLE],
    isArray: true,
  })
  message: string[];

  @ApiProperty({ example: 'Bad Request' })
  error: string;

  @ApiProperty({ example: 400 })
  statusCode: number;
}

export class SuperCategoryConflictResponse {
  @ApiProperty({
    example: SuperCategoryErrors.SUPER_CATEGORY_ALREADY_EXIST,
  })
  message: string;

  @ApiProperty({ example: 'Conflict' })
  error: string;

  @ApiProperty({ example: 409 })
  statusCode: number;
}

export class SuperCategoryNotFoundResponse {
  @ApiProperty({ example: SuperCategoryErrors.SUPER_CATEGORY_NOT_FOUND })
  message: string;

  @ApiProperty({ example: 'Not Found' })
  error: string;

  @ApiProperty({ example: 404 })
  statusCode: number;
}
