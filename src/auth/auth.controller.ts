import { Body, Controller, Post } from '@nestjs/common';
import { AUTH_ROUTES } from './auth.const';
import { AuthService } from './auth.service';
import { AuthCredentialsDTO } from './dto/auth-credentials.dto';

@Controller(AUTH_ROUTES.AUTH_ROOT)
export class AuthController {
  public constructor(private readonly authService: AuthService) {}

  @Post(AUTH_ROUTES.AUTH_SIGN_UP)
  public createUser(
    @Body() authCredentialsDTO: AuthCredentialsDTO
  ): Promise<void> {
    return this.authService.signUp(authCredentialsDTO);
  }
}
