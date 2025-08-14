import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Request } from 'express';
import { ACCESS_TOKEN_SECRET } from '@/src/common/constants/init.constant';

const cookieExtractor = (req: Request) => {
  console.log('Cookies nhận được:', req?.cookies); // Debug xem cookie có không
  return req?.cookies?.['access_token'] || null;
};

@Injectable()
export class JwtAccessStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([cookieExtractor]),
      ignoreExpiration: false,
      secretOrKey: ACCESS_TOKEN_SECRET,
    } as any);
  }

  async validate(payload: any) {
    console.log('JWT Payload:', payload); // Debug payload
    return { userId: payload.sub };
  }
}
