import { GameRepository } from 'src/domain/repositories/gameRepository.interface';

export class GetGameUseCase {
  constructor(private readonly gameRepository: GameRepository) {}

  async execute(id: string) {
    return await this.gameRepository.getGameByPlayerId(id);
  }
}
