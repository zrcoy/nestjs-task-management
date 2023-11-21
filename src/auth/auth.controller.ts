import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthCredentialsDTO } from './dto/auth-credentials.dto';

@Controller('auth')
export class AuthController {
  public constructor(private readonly authService: AuthService) {}

  @Post('/signup')
  public createUser(
    @Body() authCredentialsDTO: AuthCredentialsDTO
  ): Promise<void> {
    return this.authService.signUp(authCredentialsDTO);
  }
}
