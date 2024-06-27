import { ApiProperty } from '@nestjs/swagger';

export class AuthUserResponse {
  @ApiProperty({ example: '51846bf6-1f2a-4d65-85b2-c3e187c4d9ee' })
  id: string;

  @ApiProperty({ example: '51846bf6-1f2a-4d65-85b2-c3e187c4d9ee' })
  email: string;

  @ApiProperty({ example: null, nullable: true })
  firstName: string;

  @ApiProperty({ example: null, nullable: true })
  lastName: string;

  @ApiProperty({ example: 0 })
  bonuses: number;

  @ApiProperty({ example: null, nullable: true })
  dateOfBirth: string;

  @ApiProperty({ example: null, nullable: true })
  contactEmail: string;

  @ApiProperty({ example: null, nullable: true })
  contactPhone: string;

  @ApiProperty({ example: '2024-06-26T09:37:05.416Z' })
  createdAt: string;

  @ApiProperty({ example: '2024-06-26T09:37:05.416Z' })
  updatedAt: string;
}

export class AuthMeUnauthorizedResponse {
  @ApiProperty({ example: 'Нет доступа!' })
  message: string;

  @ApiProperty({ example: 'Unauthorized' })
  error: string;

  @ApiProperty({ example: 401 })
  statusCode: number;
}

export class AuthOkResponse {
  @ApiProperty({ type: AuthUserResponse })
  user: AuthUserResponse;

  @ApiProperty({
    example: 'eyJhbGciOi.DEwfQ.9ExBwz6oXx_IYvSJOyVbET7Rs8wiDwVfssBEtuvIJWI',
  })
  accessToken: string;
}

export class AuthBadRequestResponse {
  @ApiProperty({ example: ['Укажите корректный email!'], isArray: true })
  message: string[];

  @ApiProperty({ example: 'Bad Request' })
  error: string;

  @ApiProperty({ example: 400 })
  statusCode: number;
}

export class AuthRegisterConflictResponse {
  @ApiProperty({ example: 'Такой пользователь уже есть в системе!' })
  message: string[];

  @ApiProperty({ example: 'Conflict' })
  error: string;

  @ApiProperty({ example: 409 })
  statusCode: number;
}

export class AuthLoginNotFoundResponse {
  @ApiProperty({ example: 'Пользователь не найден!' })
  message: string[];

  @ApiProperty({ example: 'Not Found' })
  error: string;

  @ApiProperty({ example: 404 })
  statusCode: number;
}
