import { Injectable, BadRequestException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class TokenService {
  constructor(
    private readonly jwt: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async createTokens(userId: number) {
    if (!userId) {
      throw new BadRequestException('Missing userId for token creation');
    }

    const access = await this.jwt.signAsync(
      { sub: userId },
      {
        secret: this.configService.get<string>('ACCESS_TOKEN_SECRET'),
        expiresIn: this.configService.get<string>('ACCESS_TOKEN_EXPIRES'),
      },
    );

    const refresh = await this.jwt.signAsync(
      { sub: userId },
      {
        secret: this.configService.get<string>('REFRESH_TOKEN_SECRET'),
        expiresIn: this.configService.get<string>('REFRESH_TOKEN_EXPIRES'),
      },
    );

    return { access, refresh };
  }

  verifyAccessToken(token: string, ignoreExpiration = false) {
    return this.jwt.verify(token, {
      ignoreExpiration,
      secret: this.configService.get<string>('ACCESS_TOKEN_SECRET'),
    });
  }

  verifyRefreshToken(token: string) {
    return this.jwt.verify(token, {
      secret: this.configService.get<string>('REFRESH_TOKEN_SECRET'),
    });
  }
}
