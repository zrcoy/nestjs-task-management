import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  Logger,
  UnauthorizedException
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { Repository } from 'typeorm';
import { AuthErrors } from './auth-errors.enum';
import { AUTH_MESSAGES } from './auth.const';
import { AuthCredentialsDTO } from './dto/auth-credentials.dto';
import { JwtPayload } from './jwt-payload.interface';
import { User } from './user.entity';

@Injectable()
export class AuthService {
  private logger = new Logger('AuthService', { timestamp: true });
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    private jwtService: JwtService
  ) {}

  public async signUp(authCredentialsDTO: AuthCredentialsDTO): Promise<void> {
    const { username, password } = authCredentialsDTO;

    // hash
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);

    const user: User = this.userRepository.create({
      username,
      password: hashedPassword
    });

    await this.userRepository.save(user).catch((error) => {
      if (error.code === AuthErrors.DUPLICATE_USERNAME) {
        throw new ConflictException(
          AUTH_MESSAGES.error[AuthErrors.DUPLICATE_USERNAME]
        );
      } else {
        this.logger.error(
          AUTH_MESSAGES.error.FAILED_TO_SIGN_UP(username),
          error.stack
        );
        throw new InternalServerErrorException();
      }
    });
  }

  public async signIn(
    authCredentialsDTO: AuthCredentialsDTO
  ): Promise<{ accessToken: string }> {
    const { username, password } = authCredentialsDTO;
    const user = await this.userRepository.findOne({ where: { username } });
    if (user && (await bcrypt.compare(password, user.password))) {
      const payload: JwtPayload = { username };
      const accessToken = await this.jwtService.sign(payload);
      return { accessToken };
    } else {
      throw new UnauthorizedException(AUTH_MESSAGES.error.INVALID_CREDENTIALS);
    }
  }
}
