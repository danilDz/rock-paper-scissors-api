import { UserRepository } from 'src/domain/repositories/userRepository.interface';

export class GetRegularUsersUseCase {
  constructor(private readonly userRepository: UserRepository) {}

  async execute() {
    return await this.userRepository.getRegularUsers();
  }
}
