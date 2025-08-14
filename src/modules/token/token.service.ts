import { Injectable, BadRequestException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import {
  ACCESS_TOKEN_SECRET,
  ACCESS_TOKEN_EXPIRES,
  REFRESH_TOKEN_SECRET,
  REFRESH_TOKEN_EXPIRES,
} from '@/src/common/constants/init.constant';

@Injectable()
export class TokenService {
  constructor(private readonly jwt: JwtService) {}

  async createTokens(userId: number) {
    if (!userId) {
      throw new BadRequestException('Missing userId for token creation');
    }

    const access = await this.jwt.signAsync(
      { sub: userId },
      { secret: ACCESS_TOKEN_SECRET, expiresIn: ACCESS_TOKEN_EXPIRES },
    );

    const refresh = await this.jwt.signAsync(
      { sub: userId },
      { secret: REFRESH_TOKEN_SECRET, expiresIn: REFRESH_TOKEN_EXPIRES },
    );

    return { access, refresh };
  }

  verifyAccessToken(token: string, ignoreExpiration = false) {
    return this.jwt.verify(token, {
      ignoreExpiration,
      secret: ACCESS_TOKEN_SECRET,
    });
  }

  verifyRefreshToken(token: string) {
    return this.jwt.verify(token, { secret: REFRESH_TOKEN_SECRET });
  }
}
