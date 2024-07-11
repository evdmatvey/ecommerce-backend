import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';

import { Role, User } from '@prisma/client';
import { I18nContext } from 'nestjs-i18n';

import { ROLES_KEY } from '@/decorators';

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(private readonly _reflector: Reflector) {}

  public canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this._reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    const i18n = I18nContext.current();

    if (!requiredRoles) return true;

    const { user }: { user: User } = context.switchToHttp().getRequest();
    const hasRoles = requiredRoles.some((role) => user.role === role);

    if (!user || !hasRoles)
      throw new ForbiddenException(i18n.translate('errors.NO_ACCESS'));

    return true;
  }
}
