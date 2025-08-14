import { Body, Controller, Post, Res } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import type { Response } from 'express';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import {
  setAuthCookies,
  clearAuthCookies,
} from '@/src/common/utils/cookie.util';

import { User } from '@/src/common/decorator/user.decorator';
import { Public } from '@/src/common/decorator/is-public.decorator';
@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly auth: AuthService) {}
  @Public()
  @Post('register')
  async register(@Body() dto: RegisterDto) {
    const result = await this.auth.register(dto);
    return { data: result, message: 'User registered successfully' };
  }

  @Public()
  @Post('login')
  async login(
    @Body() dto: LoginDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const { user, tokens } = await this.auth.login(dto);
    setAuthCookies(res, tokens);
    return { data: user, message: 'Logged in successfully' };
  }

  @Post('refresh')
  async refresh(@User() user: any) {
    const tokens = await this.auth.issueTokens(user.userId);
    return { data: null, tokens, message: 'Token refreshed successfully' };
  }

  @Post('logout')
  async logout(@Res({ passthrough: true }) res: Response) {
    clearAuthCookies(res);
    return { data: null, message: 'Logged out successfully' };
  }
}
