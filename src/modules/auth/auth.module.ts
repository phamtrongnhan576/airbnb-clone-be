import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PrismaModule } from '@/src/modules/prisma/prisma.module';
import { TokenModule } from '@/src/modules/token/token.module';
@Module({
  imports: [PrismaModule, TokenModule],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
