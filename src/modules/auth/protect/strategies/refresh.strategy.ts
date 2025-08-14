import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Request } from 'express';
import { REFRESH_TOKEN_SECRET } from '@/src/common/constants/init.constant';

const refreshExtractor = (req: Request) =>
  req?.cookies?.['refresh_token'] || null;

@Injectable()
export class JwtRefreshStrategy extends PassportStrategy(
  Strategy,
  'jwt-refresh',
) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([refreshExtractor]),
      ignoreExpiration: false,
      secretOrKey: REFRESH_TOKEN_SECRET,
      passReqToCallback: true,
    } as any);
  }

  async validate(req: Request, payload: any) {
    return { userId: payload.sub };
  }
}
