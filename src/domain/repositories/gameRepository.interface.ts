import { GameModel, UpdateGameModel } from '../models/game';

export interface GameRepository {
  createGame(firstPlayerId: string, secondPlayerId: string): Promise<GameModel>;
  updateGameById(
    id: string,
    updateObject: Partial<UpdateGameModel>,
  ): Promise<void>;
  deleteGameById(id: string): Promise<void>;
}
