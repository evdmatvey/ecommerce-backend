import { ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { I18nContext } from 'nestjs-i18n';

export class JwtAuthGuard extends AuthGuard('jwt') {
  public canActivate(context: ExecutionContext) {
    return super.canActivate(context);
  }

  public handleRequest(err: any, user: any) {
    const i18n = I18nContext.current();
    if (err || !user)
      throw (
        err || new UnauthorizedException(i18n.translate('errors.NO_ACCESS'))
      );

    return user;
  }
}
