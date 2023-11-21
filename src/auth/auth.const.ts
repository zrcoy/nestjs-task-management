import { AuthErrors } from './auth-errors.enum';

export const AUTH_ERROR_MESSAGES: Record<AuthErrors, string> = {
  [AuthErrors.DUPLICATE_USERNAME]: 'Username already exists'
};

export const AUTH_ROUTES = {
  AUTH_ROOT: 'auth',
  AUTH_SIGN_UP: '/signup',
  AUTH_SIGN_IN: '/signin'
};
