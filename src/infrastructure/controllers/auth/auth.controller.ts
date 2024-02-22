import { Body, Controller, Inject, Post } from '@nestjs/common';
import { UseCasesProxyModule } from '../../usecases-proxy/usecases-proxy.module';
import { UseCaseProxy } from '../../usecases-proxy/usecases-proxy';
import { SignupUseCase } from '../../../usecases/auth/signup.usecases';
import { AuthDto } from './dto/auth.dto';

@Controller('auth')
export class AuthController {
  constructor(
    @Inject(UseCasesProxyModule.SIGNUP_USECASE_PROXY)
    private readonly signupUsecaseProxy: UseCaseProxy<SignupUseCase>,
  ) {}

  @Post('signup')
  async signup(@Body() auth: AuthDto) {
    console.log(auth);
    const user = await this.signupUsecaseProxy
      .getInstance()
      .execute(auth.username, auth.password);
    console.log(user);
    return user;
  }
}
