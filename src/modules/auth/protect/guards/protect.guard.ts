import {
  ExecutionContext,
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JsonWebTokenError, TokenExpiredError } from '@nestjs/jwt';
import { AuthGuard } from '@nestjs/passport';
import { IS_PUBLIC_KEY } from 'src/common/decorator/is-public.decorator';

@Injectable()
export class AuthenticationGuard extends AuthGuard('jwt') {
  constructor(private reflector: Reflector) {
    super();
  }

  canActivate(context: ExecutionContext) {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (isPublic) return true;

    const requiredRoles = this.reflector.getAllAndOverride<string[]>('roles', [
      context.getHandler(),
      context.getClass(),
    ]);

    const canActivate = super.canActivate(context) as
      | boolean
      | Promise<boolean>;

    return Promise.resolve(canActivate).then((result) => {
      if (!result) return false;

      const request = context.switchToHttp().getRequest();
      const user = request.user;

      if (requiredRoles && !requiredRoles.includes(user.role)) {
        throw new ForbiddenException(
          'You do not have permission to access this resource',
        );
      }

      return true;
    });
  }

  handleRequest(err, user, info) {
    if (err || info) {
      if (info instanceof TokenExpiredError) {
        throw new ForbiddenException('Token has expired');
      }
      if (info instanceof JsonWebTokenError) {
        throw new UnauthorizedException('Invalid token');
      }
      throw err || new UnauthorizedException();
    }
    return user;
  }
}
