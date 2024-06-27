import {
  Body,
  Controller,
  HttpCode,
  Post,
  Req,
  Res,
  UnauthorizedException,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiConflictResponse,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';

import { Request, Response } from 'express';

import { AuthErrors } from '@/constants';

import { AuthService } from './auth.service';
import { AuthDto } from './dto';
import {
  AuthBadRequestResponse,
  AuthLoginNotFoundResponse,
  AuthMeUnauthorizedResponse,
  AuthOkResponse,
  AuthRegisterConflictResponse,
} from './types';

@Controller('auth')
@ApiTags('auth')
export class AuthController {
  constructor(private readonly _authService: AuthService) {}

  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Post('/login')
  @ApiOkResponse({ type: AuthOkResponse })
  @ApiBadRequestResponse({ type: AuthBadRequestResponse })
  @ApiNotFoundResponse({ type: AuthLoginNotFoundResponse })
  public async login(
    @Body() dto: AuthDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const { refreshToken, ...response } = await this._authService.login(dto);

    this._authService.addRefreshTokenToResponse(res, refreshToken);

    return response;
  }

  @UsePipes(new ValidationPipe())
  @HttpCode(201)
  @Post('/register')
  @ApiCreatedResponse({ type: AuthOkResponse })
  @ApiBadRequestResponse({ type: AuthBadRequestResponse })
  @ApiConflictResponse({ type: AuthRegisterConflictResponse })
  public async register(
    @Body() dto: AuthDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const { refreshToken, ...response } = await this._authService.register(dto);

    this._authService.addRefreshTokenToResponse(res, refreshToken);

    return response;
  }

  @HttpCode(200)
  @Post('/logout')
  public logout(@Res({ passthrough: true }) res: Response) {
    this._authService.removeRefreshTokenFromResponse(res);

    return true;
  }

  @HttpCode(200)
  @Post('/auth-me')
  @ApiOkResponse({ type: AuthOkResponse })
  @ApiUnauthorizedResponse({ type: AuthMeUnauthorizedResponse })
  public async getNewTokens(
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
  ) {
    const refreshTokenFromCookies =
      req.cookies[this._authService.REFRESH_TOKEN_NAME];

    if (!refreshTokenFromCookies) {
      this._authService.removeRefreshTokenFromResponse(res);
      throw new UnauthorizedException(AuthErrors.NO_ACCESS);
    }

    const { refreshToken, ...response } = await this._authService.getNewTokens(
      refreshTokenFromCookies,
    );

    this._authService.addRefreshTokenToResponse(res, refreshToken);

    return response;
  }
}
