import {
  ConflictException,
  InternalServerErrorException,
} from '@nestjs/common';
import { IBcryptService } from '../../domain/adapters/bcrypt.interface';
import { UserRepository } from '../../domain/repositories/userRepository.interface';

export class SignupUseCase {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly bcryptService: IBcryptService,
  ) {}

  async execute(username: string, password: string) {
    const count = await this.userRepository.getUserCount();
    if (count === 2)
      throw new InternalServerErrorException(
        'Sorry, but the maximum number of users has been reached!',
      );
    const existingUser = await this.userRepository.getUserByUsername(username);
    if (existingUser)
      throw new ConflictException('This username is already taken!');
    const hashedPassword = await this.bcryptService.hash(password);
    const user = await this.userRepository.createUser(username, hashedPassword);
    return user;
  }
}
