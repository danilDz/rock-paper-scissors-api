import { BadRequestException } from '@nestjs/common';
import { IJwtRedisService } from 'src/domain/adapters/jwt-redis.interface';
import { UserRepository } from 'src/domain/repositories/userRepository.interface';
import { UserStatus } from 'src/domain/models/user';

export class SignoutUseCase {
  constructor(
    private readonly jwtRedisService: IJwtRedisService,
    private readonly userRepository: UserRepository,
  ) {}

  async execute(jti: string, username: string) {
    try {
      await this.jwtRedisService.destroy(jti);
      const user = await this.userRepository.getUserByUsername(username);
      if (user.status != UserStatus['made-a-choice'])
        await this.userRepository.updateUserStatusByUsername(
          username,
          UserStatus['out-of-game'],
        );
    } catch (err) {
      throw new BadRequestException(err.message);
    }
  }
}
