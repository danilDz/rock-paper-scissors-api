import { BadRequestException } from '@nestjs/common';
import { IBcryptService } from '../../domain/adapters/bcrypt.interface';
import { UserRepository } from '../../domain/repositories/userRepository.interface';
import { IJwtRedisService } from 'src/domain/adapters/jwt-redis.interface';
import { JwtConfig } from 'src/domain/config/jwt.interface';
import { UserStatus } from 'src/domain/models/user';

export class SigninUseCase {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly bcryptService: IBcryptService,
    private readonly jwtRedisService: IJwtRedisService,
    private readonly jwtConfig: JwtConfig,
  ) {}

  async execute(username: string, password: string) {
    const user = await this.userRepository.getUserByUsername(username);
    if (!user)
      throw new BadRequestException('User with this username not found!');
    try {
      if (!(await this.bcryptService.compare(password, user.password)))
        throw new BadRequestException('Wrong password!');
      const secret = this.jwtConfig.getJwtSecret();
      const expiresIn = this.jwtConfig.getJwtExpireTime();
      if (UserStatus[user.status] !== 'made-a-choice')
        await this.userRepository.updateUserStatusByUsername(
          username,
          UserStatus['in-game'],
        );
      return await this.jwtRedisService.sign(
        { username, status: user.status, isAdmin: user.isAdmin, id: user.id },
        secret,
        expiresIn,
      );
    } catch (err) {
      throw new BadRequestException(err.message);
    }
  }
}
