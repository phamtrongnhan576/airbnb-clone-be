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

    const user = await this.prisma.users.create({
      data: {
        name: dto.name,
        email: dto.email,
        role: dto.role || 'user',
        password: hash,
        phone: dto.phone || null,
        birthday: dto.birthday ? new Date(dto.birthday) : null,
        gender: dto.gender ?? null,
        avatar: dto.avatar || null,
      },
    });

    // Xoá password trước khi trả về
    const { password, ...safeUser } = user;
    return safeUser;
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

    // Loại bỏ password trước khi trả về
    const { password, ...safeUser } = user;

    return { user: safeUser, tokens };
  }

  /** Refresh token */
  async issueTokens(userId: number) {
    return this.tokenService.createTokens(userId);
  }
}
