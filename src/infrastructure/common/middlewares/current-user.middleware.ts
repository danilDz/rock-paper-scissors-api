import {
  Injectable,
  NestMiddleware,
  UnauthorizedException,
} from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { IJwtRedisServicePayload } from 'src/domain/adapters/jwt-redis.interface';
import { DatabaseUserRepository } from 'src/infrastructure/repositories/user.repository';
import { EnvironmentConfigService } from 'src/infrastructure/config/environment/environment-config.service';
import { JwtRedisService } from 'src/infrastructure/services/jwt-redis/jwt-redis.service';

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace Express {
    interface Request {
      currentUser?: IJwtRedisServicePayload;
    }
  }
}

@Injectable()
export class CurrentUserMiddleware implements NestMiddleware {
  constructor(
    private readonly userRepository: DatabaseUserRepository,
    private readonly jwtConfig: EnvironmentConfigService,
    private readonly jwtRedisService: JwtRedisService,
  ) {}

  async use(req: Request, res: Response, next: NextFunction) {
    req.currentUser = null;
    const auth = req.headers.authorization;
    if (!auth) throw new UnauthorizedException("You're unauthorized!");
    try {
      const token = auth.split(' ')[1];
      const secret = this.jwtConfig.getJwtSecret();
      const decodedToken = await this.jwtRedisService.verify(token, secret);
      const user = await this.userRepository.getUserByUsername(
        decodedToken.username,
      );
      if (user) req.currentUser = decodedToken;
    } catch (e) {
      throw new UnauthorizedException(e.message);
    }
    next();
  }
}
