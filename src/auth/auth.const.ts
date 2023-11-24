import { AuthErrors } from './auth-errors.enum';

export const AUTH_MESSAGES = {
  error: {
    [AuthErrors.DUPLICATE_USERNAME]: 'Username already exists',
    FAILED_TO_SIGN_UP: (user: string) =>
      `Failed to sign up for user "${user}".`,
    INVALID_CREDENTIALS: 'Invalid credentials'
  },
  verbose: {
    signUp: (username: string) => `User "${username}" signing up.`,
    signIn: (username: string) => `User "${username}" signing in.`
  }
};

export const AUTH_ROUTES = {
  AUTH_ROOT: 'auth',
  AUTH_SIGN_UP: '/signup',
  AUTH_SIGN_IN: '/signin'
};
