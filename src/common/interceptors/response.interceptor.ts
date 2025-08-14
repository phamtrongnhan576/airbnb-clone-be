import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import type { Response } from 'express';
import { setAuthCookies } from '@/src/common/utils/cookie.util';

@Injectable()
export class ResponseInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const res = context.switchToHttp().getResponse<Response>();

    return next.handle().pipe(
      map((data) => {
        // Nếu data có tokens thì set cookies
        if (data?.tokens) {
          setAuthCookies(res, data.tokens);
          // Không trả tokens về client để tránh lộ
          delete data.tokens;
        }

        return {
          status: 'success',
          statusCode: res.statusCode,
          data: data?.data ?? data,
          message: data?.message ?? 'OK',
        };
      }),
    );
  }
}
