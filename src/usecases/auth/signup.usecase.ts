import {
  BadRequestException,
  ConflictException,
  InternalServerErrorException,
} from '@nestjs/common';
import { IBcryptService } from '../../domain/adapters/bcrypt.interface';
import { UserRepository } from '../../domain/repositories/userRepository.interface';
import { IJwtRedisService } from 'src/domain/adapters/jwt-redis.interface';
import { JwtConfig } from 'src/domain/config/jwt.interface';

export class SignupUseCase {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly bcryptService: IBcryptService,
    private readonly jwtRedisService: IJwtRedisService,
    private readonly jwtConfig: JwtConfig,
  ) {}

  async execute(username: string, password: string, isAdmin: boolean) {
    const count = await this.userRepository.getRegularUserCount();
    if (count >= 2 && !isAdmin)
      throw new InternalServerErrorException(
        'Sorry, but the maximum number of users has been reached!',
      );
    const existingUser = await this.userRepository.getUserByUsername(username);
    if (existingUser)
      throw new ConflictException('This username is already taken!');
    try {
      const hashedPassword = await this.bcryptService.hash(password);
      const user = await this.userRepository.createUser(
        username,
        hashedPassword,
        isAdmin,
      );
      const secret = this.jwtConfig.getJwtSecret();
      const expiresIn = this.jwtConfig.getJwtExpireTime();
      const token = await this.jwtRedisService.sign(
        { username, status: user.status, isAdmin: user.isAdmin },
        secret,
        expiresIn,
      );
      return { ...user, token };
    } catch (err) {
      throw new BadRequestException(err.message);
    }
  }
}
