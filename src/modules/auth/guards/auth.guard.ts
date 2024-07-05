import { ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { AuthErrors } from '@/constants';

export class JwtAuthGuard extends AuthGuard('jwt') {
  public canActivate(context: ExecutionContext) {
    return super.canActivate(context);
  }

  public handleRequest(err: any, user: any) {
    if (err || !user)
      throw err || new UnauthorizedException(AuthErrors.NO_ACCESS);

    return user;
  }
}
