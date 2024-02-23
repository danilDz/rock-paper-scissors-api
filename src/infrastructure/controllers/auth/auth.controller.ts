import { Body, Controller, Get, Inject, Post, UseGuards } from '@nestjs/common';
import { AuthDto } from './dto/auth.dto';
import { CurrentUser } from 'src/infrastructure/common/decorators/current-user.decorator';
import { IJwtRedisServiceVerifyResponse } from 'src/domain/adapters/jwt-redis.interface';
import { AuthGuard } from 'src/infrastructure/common/guards/auth.guard';
import { Serialize } from 'src/infrastructure/common/interceptors/serialize.interceptor';
import { UserDto } from './dto/user.dto';
import { UseCasesProxyModule } from '../../usecases-proxy/usecases-proxy.module';
import { UseCaseProxy } from '../../usecases-proxy/usecases-proxy';
import { SignupUseCase } from 'src/usecases/auth/signup.usecase';
import { SigninUseCase } from 'src/usecases/auth/signin.usecase';
import { SignoutUseCase } from 'src/usecases/auth/signout.usecase';

@Controller('auth')
export class AuthController {
  constructor(
    @Inject(UseCasesProxyModule.SIGNUP_USECASE_PROXY)
    private readonly signupUseCaseProxy: UseCaseProxy<SignupUseCase>,
    @Inject(UseCasesProxyModule.SIGNIN_USECASE_PROXY)
    private readonly signinUseCaseProxy: UseCaseProxy<SigninUseCase>,
    @Inject(UseCasesProxyModule.SIGNOUT_USECASE_PROXY)
    private readonly signoutUseCaseProxy: UseCaseProxy<SignoutUseCase>,
  ) {}

  @Post('signup')
  async signup(@Body() auth: AuthDto) {
    const user = await this.signupUseCaseProxy
      .getInstance()
      .execute(auth.username, auth.password);
    return user;
  }

  @Post('signin')
  async signin(@Body() auth: AuthDto) {
    const token = await this.signinUseCaseProxy
      .getInstance()
      .execute(auth.username, auth.password);
    return token;
  }

  @Post('signout')
  @UseGuards(AuthGuard)
  async signout(@CurrentUser() user: IJwtRedisServiceVerifyResponse) {
    await this.signoutUseCaseProxy
      .getInstance()
      .execute(user.jti, user.username);
    return 'Logged out';
  }

  @Get('check')
  @Serialize(UserDto)
  async checkAuth(@CurrentUser() user: IJwtRedisServiceVerifyResponse) {
    return user;
  }
}
