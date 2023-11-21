import { Injectable } from '@nestjs/common';
import { AuthCredentialsDTO } from './dto/auth-credentials.dto';
import { UserRepository } from './users.repository';

@Injectable()
export class AuthService {
  constructor(private readonly userRepository: UserRepository) {}

  public async signUp(authCredentialsDTO: AuthCredentialsDTO): Promise<void> {
    return this.userRepository.createUser(authCredentialsDTO);
  }
}
