import { CookieOptions } from 'express';

export const AuthCookieConfig: CookieOptions = {
  httpOnly: true,
  domain: 'localhost',
  secure: true,
  sameSite: 'none',
};
