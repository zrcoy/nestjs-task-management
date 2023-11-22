import { Body, Controller, Logger, Post } from '@nestjs/common';
import { AUTH_ROUTES } from './auth.const';
import { AuthService } from './auth.service';
import { AuthCredentialsDTO } from './dto/auth-credentials.dto';

@Controller(AUTH_ROUTES.AUTH_ROOT)
export class AuthController {
  private logger = new Logger('AuthController', { timestamp: true });
  public constructor(private authService: AuthService) {}

  @Post(AUTH_ROUTES.AUTH_SIGN_UP)
  public signUp(@Body() authCredentialsDTO: AuthCredentialsDTO): Promise<void> {
    this.logger.verbose(`User "${authCredentialsDTO.username}" signing up.`);
    return this.authService.signUp(authCredentialsDTO);
  }

  @Post(AUTH_ROUTES.AUTH_SIGN_IN)
  public signIn(
    @Body() authCredentialsDTO: AuthCredentialsDTO
  ): Promise<{ accessToken: string }> {
    return this.authService.signIn(authCredentialsDTO);
  }
}
