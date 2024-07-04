import { ApiProperty } from '@nestjs/swagger';

import { Brand } from '@prisma/client';

import { BrandErrors, BrandMessages, ValidationErrors } from '@/constants';

export class BrandResponse {
  @ApiProperty({ example: '51846bf6-1f2a-4d65-85b2-c3e187c4d9ee' })
  id: string;

  @ApiProperty({ example: 'Apple' })
  title: string;
}

export class BrandMessageResponse {
  @ApiProperty({ example: BrandMessages.BRAND_DELETE_SUCCESS })
  message: string;
}

export class BrandCreateResponse extends BrandMessageResponse {
  @ApiProperty({ type: BrandResponse })
  brand: Brand;
}

export class BrandUpdateResponse extends BrandMessageResponse {
  @ApiProperty({ type: BrandResponse })
  brand: Brand;
}

export class BrandNotFoundResponse {
  @ApiProperty({ example: BrandErrors.BRAND_NOT_FOUND })
  message: string;

  @ApiProperty({ example: 'Not Found' })
  error: string;

  @ApiProperty({ example: 404 })
  statusCode: number;
}

export class BrandCreateBadRequestResponse {
  @ApiProperty({ example: ValidationErrors.BRAND_EMPTY_TITLE, isArray: true })
  message: string;

  @ApiProperty({ example: 'Bad Request' })
  error: string;

  @ApiProperty({ example: 400 })
  statusCode: number;
}

export class BrandConflictResponse {
  @ApiProperty({ example: BrandErrors.BRAND_ALREADY_EXIST })
  message: string;

  @ApiProperty({ example: 'Conflict' })
  error: string;

  @ApiProperty({ example: 409 })
  statusCode: number;
}
