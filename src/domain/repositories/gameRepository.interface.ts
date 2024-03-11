import { GameModel, UpdateGameModel } from '../models/game';

export interface GameRepository {
  createGame(firstPlayerId: string, secondPlayerId: string): Promise<GameModel>;
  updateGameById(
    id: string,
    updateObject: Partial<UpdateGameModel>,
  ): Promise<void>;
  deleteGameById(id: string): Promise<void>;
  getGameById(id: string): Promise<GameModel>;
  getGameByPlayerId(id: string): Promise<GameModel>;
  getGameByBothPlayerIds(id1: string, id2: string): Promise<GameModel>;
}
