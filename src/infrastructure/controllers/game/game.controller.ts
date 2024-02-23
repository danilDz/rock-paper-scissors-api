import {
  Body,
  Controller,
  Inject,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from 'src/infrastructure/common/guards/auth.guard';
import { UseCasesProxyModule } from 'src/infrastructure/usecases-proxy/usecases-proxy.module';
import { UseCaseProxy } from 'src/infrastructure/usecases-proxy/usecases-proxy';
import { CreateGameUseCase } from 'src/usecases/game/create-game.usecase';
import { CreateGameDto } from './dto/create-game.dto';
import { UpdateGameModel } from 'src/domain/models/game';
import { UpdateGameUseCase } from 'src/usecases/game/update-game.usecase';

@Controller('game')
@UseGuards(AuthGuard)
export class GameController {
  constructor(
    @Inject(UseCasesProxyModule.CREATE_GAME_USECASE_PROXY)
    private readonly createGameUseCaseProxy: UseCaseProxy<CreateGameUseCase>,
    @Inject(UseCasesProxyModule.UPDATE_GAME_USECASE_PROXY)
    private readonly updateGameUseCaseProxy: UseCaseProxy<UpdateGameUseCase>,
  ) {}

  @Post('create')
  async createGame(@Body() body: CreateGameDto) {
    return await this.createGameUseCaseProxy
      .getInstance()
      .execute(body.firstPlayerId, body.secondPlayerId);
  }

  @Patch('update/:id')
  async updateGame(
    @Param('id') id: string,
    @Body() body: Partial<UpdateGameModel>,
  ) {
    return await this.updateGameUseCaseProxy.getInstance().execute(id, body);
  }
}
