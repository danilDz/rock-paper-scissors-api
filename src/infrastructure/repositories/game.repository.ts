import { InjectRepository } from '@nestjs/typeorm';
import { GameModel, UpdateGameModel } from 'src/domain/models/game';
import { GameRepository } from 'src/domain/repositories/gameRepository.interface';
import { Game } from '../entities/game.entity';
import { Choice } from 'src/domain/models/game';
import { Repository } from 'typeorm';

export class DatabaseGameRepository implements GameRepository {
  constructor(
    @InjectRepository(Game)
    private readonly gameEntityRepository: Repository<Game>,
  ) {}

  async createGame(
    firstPlayerId: string,
    secondPlayerId: string,
  ): Promise<GameModel> {
    const game = this.gameEntityRepository.create({
      firstPlayerId,
      secondPlayerId,
      firstPlayerScore: 0,
      secondPlayerScore: 0,
      firstPlayerChoice: Choice['not-selected'],
      secondPlayerChoice: Choice['not-selected'],
    });
    return await this.gameEntityRepository.save(game);
  }

  async updateGameById(
    id: string,
    updateObject: Partial<UpdateGameModel>,
  ): Promise<void> {
    await this.gameEntityRepository
      .createQueryBuilder()
      .update(Game)
      .set({ ...updateObject })
      .where('id = :id', { id })
      .execute();
  }

  async deleteGameById(id: string): Promise<void> {
    await this.gameEntityRepository.delete({ id });
  }
}
