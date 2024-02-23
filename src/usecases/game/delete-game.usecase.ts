import { GameRepository } from 'src/domain/repositories/gameRepository.interface';

export class DeleteGameUseCase {
  constructor(private readonly gameRepository: GameRepository) {}

  async execute(id: string) {
    await this.gameRepository.deleteGameById(id);
  }
}
