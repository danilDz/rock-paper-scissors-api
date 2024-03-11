import { BadRequestException } from '@nestjs/common';
import { Choice, UpdateGameModel } from 'src/domain/models/game';
import { UserModel, UserStatus } from 'src/domain/models/user';
import { GameRepository } from 'src/domain/repositories/gameRepository.interface';
import { UserRepository } from 'src/domain/repositories/userRepository.interface';

export class UpdateGameUseCase {
  constructor(
    private readonly gameRepository: GameRepository,
    private readonly userRepository: UserRepository,
  ) {}

  async execute(id: string, updateObject: Partial<UpdateGameModel>) {
    if (!Object.entries(updateObject).length) return;
    if (
      (updateObject.firstPlayerChoice &&
        typeof Choice[updateObject.firstPlayerChoice] === 'undefined') ||
      (updateObject.secondPlayerChoice &&
        typeof Choice[updateObject.secondPlayerChoice] === 'undefined')
    )
      throw new BadRequestException(
        'Choice must be equal to one of the following: `paper`, `rock`, `scissors` or `not-selected`!',
      );

    const game = await this.gameRepository.getGameById(id);
    if (
      (Choice[updateObject.firstPlayerChoice] as unknown as Choice) !==
        Choice['not-selected'] &&
      (game.firstPlayerId as unknown as UserModel).status !==
        UserStatus['made-a-choice']
    ) {
      await this.userRepository.updateUserStatusByUsername(
        (game.firstPlayerId as unknown as UserModel).username,
        UserStatus['made-a-choice'],
      );
    }
    if (
      (Choice[updateObject.secondPlayerChoice] as unknown as Choice) !==
        Choice['not-selected'] &&
      (game.secondPlayerId as unknown as UserModel).status !==
        UserStatus['made-a-choice']
    ) {
      await this.userRepository.updateUserStatusByUsername(
        (game.secondPlayerId as unknown as UserModel).username,
        UserStatus['made-a-choice'],
      );
    }

    if (
      (Choice[updateObject.firstPlayerChoice] as unknown as Choice) ===
        Choice['not-selected'] &&
      (game.firstPlayerId as unknown as UserModel).status ==
        UserStatus['made-a-choice']
    ) {
      await this.userRepository.updateUserStatusByUsername(
        (game.firstPlayerId as unknown as UserModel).username,
        UserStatus['in-game'],
      );
    }
    if (
      (Choice[updateObject.secondPlayerChoice] as unknown as Choice) ===
        Choice['not-selected'] &&
      (game.secondPlayerId as unknown as UserModel).status ==
        UserStatus['made-a-choice']
    ) {
      await this.userRepository.updateUserStatusByUsername(
        (game.secondPlayerId as unknown as UserModel).username,
        UserStatus['in-game'],
      );
    }

    await this.gameRepository.updateGameById(id, {
      ...updateObject,
      firstPlayerChoice: Choice[
        updateObject.firstPlayerChoice
      ] as unknown as Choice,
      secondPlayerChoice: Choice[
        updateObject.secondPlayerChoice
      ] as unknown as Choice,
    });

    return { message: 'Successfully updated!' };
  }
}
