import { Response } from 'express';
import {
  ACCESS_TOKEN_EXPIRES,
  REFRESH_TOKEN_EXPIRES,
} from '../constants/init.constant';

// Xác định local hay production
const isLocal = process.env.NODE_ENV !== 'production';

function parseExpiry(expiry?: string) {
  if (!expiry) return undefined;
  const match = expiry.match(/^(\d+)([smhd])?$/);
  if (!match) return undefined;

  const value = parseInt(match[1], 10);
  const unit = match[2] || 's';

  const multipliers: Record<string, number> = {
    s: 1000,
    m: 60 * 1000,
    h: 60 * 60 * 1000,
    d: 24 * 60 * 60 * 1000,
  };

  return value * multipliers[unit];
}

/** Đặt cookie access + refresh token */
export const setAuthCookies = (
  res: Response,
  tokens: { access: string; refresh: string },
) => {
  const cookieOptions = {
    httpOnly: !isLocal, // Local => false để Swagger/Postman đọc được
    secure: !isLocal, // Local => false để chạy HTTP
    sameSite: 'lax' as const,
  };

  res.cookie('access_token', tokens.access, {
    ...cookieOptions,
    maxAge: parseExpiry(ACCESS_TOKEN_EXPIRES),
    path: '/',
  });

  res.cookie('refresh_token', tokens.refresh, {
    ...cookieOptions,
    maxAge: parseExpiry(REFRESH_TOKEN_EXPIRES),
    path: '/api/auth/refresh',
  });
};

/** Xoá cookie */
export const clearAuthCookies = (res: Response) => {
  const cookieOptions = {
    httpOnly: !isLocal,
    secure: !isLocal,
    sameSite: 'lax' as const,
  };

  res.clearCookie('access_token', { ...cookieOptions, path: '/' });
  res.clearCookie('refresh_token', {
    ...cookieOptions,
    path: '/api/auth/refresh',
  });
};
