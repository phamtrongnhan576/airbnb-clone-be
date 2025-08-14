import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as cookieParser from 'cookie-parser';
import { ResponseInterceptor } from '@/src/common/interceptors/response.interceptor';
import { AuthenticationGuard } from '@/src/modules/auth/protect/guards/protect.guard';
import { ConfigService } from '@nestjs/config/dist/config.service';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use((cookieParser as any).default());

  const configService = app.get(ConfigService);

  app.enableCors({
    origin: process.env.CORS_ORIGIN?.split(',') || ['http://localhost:3000'],
    credentials: true,
  });

  const reflector = app.get(Reflector);
  app.useGlobalInterceptors(new ResponseInterceptor());
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );
  app.useGlobalGuards(new AuthenticationGuard(reflector));

  const config = new DocumentBuilder()
    .setTitle('Airbnb Clone API')
    .setDescription('Auth via httpOnly cookies (JWT)')
    .setVersion('1.0.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('swagger', app, document, {
    swaggerOptions: { withCredentials: true }, // Cho phép Swagger gửi/lưu cookie
  });

  const logger = new Logger('Bootstrap');
  const port = configService.get<number>('PORT') || 3000;
  await app.listen(port, () => {
    logger.log(`Server running on port http://localhost:${port}`);
  });
}
bootstrap();
