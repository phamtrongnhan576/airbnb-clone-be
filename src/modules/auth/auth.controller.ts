import {
  BadRequestException,
  Body,
  Controller,
  Post,
  Req,
  Res,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import {
  setAuthCookies,
  clearAuthCookies,
} from '@/src/common/utils/cookie.util';
import { Public } from '@/src/common/decorator/is-public.decorator';
import type { Request } from 'express';
import { AvatarUploadInterceptor } from '@/src/common/multer/cloudinary/cloudinary.multer';
import { ApiAvatarUpload } from '@/src/common/swagger/upload-avatar.swagger';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly auth: AuthService) {}

  @Public()
  @Post('register')
  @UseInterceptors(AvatarUploadInterceptor)
  @ApiAvatarUpload()
  async register(
    @UploadedFile() file: Express.Multer.File,
    @Body() dto: RegisterDto,
  ) {
    dto.avatar = file?.path || null;
    const result = await this.auth.register(dto);
    return { data: result, message: 'User registered successfully' };
  }

  @Public()
  @Post('login')
  async login(@Body() dto: LoginDto, @Res({ passthrough: true }) res) {
    const { user, tokens } = await this.auth.login(dto);
    setAuthCookies(res, tokens);
    return { data: user, message: 'Logged in successfully' };
  }

  @Post('refresh')
  async refresh(@Req() req: Request) {
    const refreshToken = req.cookies?.refresh_token || req.body.refresh_token;
    if (!refreshToken) {
      throw new BadRequestException('Missing refresh token');
    }

    const payload = this.auth['tokenService'].verifyRefreshToken(refreshToken);
    const tokens = await this.auth.issueTokens(payload.sub);

    return { data: null, tokens, message: 'Token refreshed successfully' };
  }

  @Post('logout')
  async logout(@Res({ passthrough: true }) res) {
    clearAuthCookies(res);
    return { data: null, message: 'Logged out successfully' };
  }
}
