import {
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  handleRequest(err, user, info, context: ExecutionContext) {
    if (err || !user) {
      console.error('JWT Auth Error:', info?.message || err?.message);
      throw new UnauthorizedException('Invalid or missing token');
    }
    return user;
  }
}
