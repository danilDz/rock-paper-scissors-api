import { GameRepository } from 'src/domain/repositories/gameRepository.interface';

export class GetGameUseCase {
  constructor(private readonly gameRepository: GameRepository) {}

  async execute(id: string) {
    const game = await this.gameRepository.getGameByPlayerId(id);
    if (!game) return { gameNotFound: true };
    return game;
  }
}
