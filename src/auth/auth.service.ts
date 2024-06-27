import {
  ConflictException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { User } from '@prisma/client';
import { hash, verify } from 'argon2';
import { Response } from 'express';

import { AuthCookieConfig } from '@/config';
import { AuthErrors } from '@/constants';
import { UserService } from '@/user';

import { AuthDto } from './dto';
import { Tokens } from './types';
import { AuthResult } from './types';

@Injectable()
export class AuthService {
  public readonly REFRESH_TOKEN_NAME = 'refreshToken';

  private readonly EXPIRE_DAY_REFRESH_TOKEN = 1;
  private readonly ACCESS_TOKEN_EXPIRES_IN = '1h';
  private readonly REFRESH_TOKEN_EXPIRES_IN = '7d';

  constructor(
    private readonly _jwt: JwtService,
    private readonly _userService: UserService,
  ) {}

  public async register(dto: AuthDto): Promise<AuthResult> {
    const oldUser = await this._userService.getUserByEmail(dto.email);

    if (oldUser) throw new ConflictException(AuthErrors.USER_ALREADY_EXIST);

    const hashedPassword = await hash(dto.password);

    const { password, ...user } = await this._userService.create({
      ...dto,
      password: hashedPassword,
    });

    const tokens = this._issueTokens(user.id);

    return { user, ...tokens };
  }

  public async login(dto: AuthDto): Promise<AuthResult> {
    const { password, ...user } = await this._validateUser(dto);

    const tokens = this._issueTokens(user.id);

    return { user, ...tokens };
  }

  public async getNewTokens(refreshToken: string): Promise<AuthResult> {
    const result = await this._jwt.verifyAsync(refreshToken);

    if (!result) throw new UnauthorizedException(AuthErrors.NO_ACCESS);

    const { password, ...user } = await this._userService.getUserById(
      result.id,
    );

    const tokens = this._issueTokens(user.id);

    return { user, ...tokens };
  }

  public addRefreshTokenToResponse(res: Response, refreshToken: string): void {
    const expiresIn = new Date();
    expiresIn.setDate(expiresIn.getDate() + this.EXPIRE_DAY_REFRESH_TOKEN);

    res.cookie(this.REFRESH_TOKEN_NAME, refreshToken, {
      ...AuthCookieConfig,
      expires: expiresIn,
    });
  }

  public removeRefreshTokenFromResponse(res: Response): void {
    res.cookie(this.REFRESH_TOKEN_NAME, '', {
      ...AuthCookieConfig,
      expires: new Date(0),
    });
  }

  private _issueTokens(userId: string): Tokens {
    const data = { id: userId };

    const accessToken = this._jwt.sign(data, {
      expiresIn: this.ACCESS_TOKEN_EXPIRES_IN,
    });

    const refreshToken = this._jwt.sign(data, {
      expiresIn: this.REFRESH_TOKEN_EXPIRES_IN,
    });

    return { accessToken, refreshToken };
  }

  private async _validateUser(dto: AuthDto): Promise<User> {
    const user = await this._userService.getUserByEmail(dto.email);

    if (!user) throw new NotFoundException(AuthErrors.USER_NOT_FOUND);

    const isValid = await verify(user.password, dto.password);

    if (!isValid)
      throw new UnauthorizedException(AuthErrors.INCORRECT_PASSWORD);

    return user;
  }
}