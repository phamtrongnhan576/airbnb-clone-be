import { Module } from '@nestjs/common';
import { AuthModule } from '@/src/modules/auth/auth.module';
import { PrismaModule } from '@/src/modules/prisma/prisma.module';
import { TokenModule } from '@/src/modules/token/token.module';
import { protectStrategy } from '@/src/modules/auth/protect/strategies/protect.strategy';
import { ConfigModule } from '@nestjs/config/dist/config.module';
import { BookingModule } from '@/src/modules/bookings/booking.module';
import { RoomsModule } from '@/src/modules/rooms/rooms.module';
import { UsersModule } from '@/src/modules/users/users.module';
import { LocationsModule } from '@/src/modules/locations/locations.module';
import { CommentsModule } from '@/src/modules/comments/comments.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    AuthModule,
    PrismaModule,
    TokenModule,
    BookingModule,
    RoomsModule,
    UsersModule,
    LocationsModule,
    CommentsModule,
  ],
  providers: [protectStrategy],
})
export class AppModule {}
