import { BadRequestException } from '@nestjs/common';
import { Choice, UpdateGameModel } from 'src/domain/models/game';
import { GameRepository } from 'src/domain/repositories/gameRepository.interface';

export class UpdateGameUseCase {
  constructor(private readonly gameRepository: GameRepository) {}

  async execute(id: string, updateObject: Partial<UpdateGameModel>) {
    if (!Object.entries(updateObject).length) return;
    if (
      typeof Choice[updateObject.firstPlayerChoice] === 'undefined' ||
      typeof Choice[updateObject.secondPlayerChoice] === 'undefined'
    )
      throw new BadRequestException(
        'Choice must be equal to one of the following: `paper`, `rock`, `scissors` or `not-selected`!',
      );
    await this.gameRepository.updateGameById(id, {
      ...updateObject,
      firstPlayerChoice: Choice[
        updateObject.firstPlayerChoice
      ] as unknown as Choice,
      secondPlayerChoice: Choice[
        updateObject.secondPlayerChoice
      ] as unknown as Choice,
    });
  }
}
