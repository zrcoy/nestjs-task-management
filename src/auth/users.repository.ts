import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

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

    const user: User = this.userRepository.create({
      username,
      password
    });

    await this.userRepository.save(user);
  }
}
