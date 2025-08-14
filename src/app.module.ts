import { Module } from '@nestjs/common';
import { AuthModule } from './modules/auth/auth.module';
import { PrismaModule } from './modules/prisma/prisma.module';

import { TokenModule } from './modules/token/token.module';
import { protectStrategy } from './modules/auth/protect/strategies/protect.strategy';
import { ConfigModule } from '@nestjs/config/dist/config.module';
import { BookingsModule } from './modules/bookings/bookings.module';
import { ModuleModule } from './modules/booking/module/module.module';
import { BookingModule } from './modules/booking/booking.module';
import { RoomsModule } from './modules/rooms/rooms.module';
import { UsersModule } from './modules/users/users.module';
import { LocationsModule } from './modules/locations/locations.module';
import { CommentsModule } from './modules/comments/comments.module';
import { RoomDetailModule } from './modules/room-detail/room-detail.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    AuthModule,

    PrismaModule,
    TokenModule,
    BookingsModule,
    ModuleModule,
    BookingModule,
    RoomsModule,
    UsersModule,
    LocationsModule,
    CommentsModule,
    RoomDetailModule,
  ],
  providers: [protectStrategy],
})
export class AppModule {}
