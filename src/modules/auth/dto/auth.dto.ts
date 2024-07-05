import { ApiProperty } from '@nestjs/swagger';

import { IsEmail, MinLength } from 'class-validator';

import { ValidationErrors } from '@/constants';

export class AuthDto {
  @ApiProperty({ example: 'test@email.test' })
  @IsEmail({}, { message: ValidationErrors.AUTH_INCORRECT_EMAIL })
  email: string;

  @ApiProperty({ example: 'CorrectPassword' })
  @MinLength(8, { message: ValidationErrors.AUTH_INCORRECT_PASSWORD_LENGTH })
  password: string;
}
