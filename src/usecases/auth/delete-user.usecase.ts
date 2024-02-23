import { UserRepository } from 'src/domain/repositories/userRepository.interface';

export class DeleteUserUseCase {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(username: string) {
    await this.userRepository.deleteUserByUsername(username);
  }
}
