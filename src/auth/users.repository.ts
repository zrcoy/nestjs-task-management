import {
  ConflictException,
  Injectable,
  InternalServerErrorException
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import * as bcrypt from 'bcrypt';
import { AuthErrors } from './auth-errors.enum';
import { AUTH_ERROR_MESSAGES } from './auth.const';
import { AuthCredentialsDTO } from './dto/auth-credentials.dto';
import { User } from './user.entity';

@Injectable()
export class UserRepository {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>
  ) {}

  public async createUser(
    authCredentialsDTO: AuthCredentialsDTO
  ): Promise<void> {
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
          AUTH_ERROR_MESSAGES[AuthErrors.DUPLICATE_USERNAME]
        );
      } else {
        throw new InternalServerErrorException();
      }
    });
  }
}
