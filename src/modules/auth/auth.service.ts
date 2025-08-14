import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
import { PrismaService } from '@/src/modules/prisma/prisma.service';
import { TokenService } from '@/src/modules/token/token.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private tokenService: TokenService,
  ) {}

  /** Đăng ký */
  async register(dto: RegisterDto) {
    // Kiểm tra email tồn tại
    const existed = await this.prisma.users.findUnique({
      where: { email: dto.email },
    });
    if (existed) throw new BadRequestException('Email already exists');

    // Hash mật khẩu
    const hash = await bcrypt.hash(dto.password, 10);

    // Lưu user mới
    const user = await this.prisma.users.create({
      data: {
        name: dto.name,
        email: dto.email,
        password: hash,
      },
      select: { id: true, name: true, email: true, createdAt: true },
    });

    return user;
  }

  /** Đăng nhập */
  async login(dto: LoginDto) {
    const user = await this.prisma.users.findUnique({
      where: { email: dto.email },
    });
    if (!user) throw new BadRequestException('Invalid credentials');

    const checkPassword = await bcrypt.compare(dto.password, user.password);
    if (!checkPassword) throw new BadRequestException('Invalid credentials');

    const tokens = await this.tokenService.createTokens(user.id);
    const safeUser = { id: user.id, name: user.name, email: user.email };

    return { user: safeUser, tokens };
  }

  /** Lấy thông tin user hiện tại */

  async me(userId: number) {
    const user = await this.prisma.users.findUnique({
      where: { id: userId },
      select: { id: true, name: true, email: true, createdAt: true },
    });
    if (!user) throw new UnauthorizedException();
    return user;
  }

  /** Refresh token */
  async issueTokens(userId: number) {
    return this.tokenService.createTokens(userId);
  }
}
