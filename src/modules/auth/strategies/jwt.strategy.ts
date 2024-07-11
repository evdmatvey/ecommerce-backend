import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';

import { User } from '@prisma/client';
import { I18nContext } from 'nestjs-i18n';
import { ExtractJwt, Strategy } from 'passport-jwt';

import { UserService } from '@/modules/user';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly _configService: ConfigService,
    private readonly _userService: UserService,
  ) {
    const secretOrKey: string = _configService.get('JWT_SECRET');
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: true,
      secretOrKey,
    });
  }

  public async validate({ id }: { id: string }): Promise<User> {
    const user = await this._userService.getUserById(id);
    const i18n = I18nContext.current();

    if (user === null || typeof user === 'undefined')
      throw new UnauthorizedException(i18n.translate('errors.NO_ACCESS'));

    return user;
  }
}
