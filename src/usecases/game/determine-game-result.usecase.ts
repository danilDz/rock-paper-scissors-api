import { BadRequestException } from '@nestjs/common';
import { Choice } from 'src/domain/models/game';
import { UserModel, UserStatus } from 'src/domain/models/user';
import { GameRepository } from 'src/domain/repositories/gameRepository.interface';
import { UserRepository } from 'src/domain/repositories/userRepository.interface';

export class DetermineGameResultUseCase {
  constructor(
    private readonly gameRepository: GameRepository,
    private readonly userRepository: UserRepository,
  ) {}

  async execute(userId: string) {
    const game = await this.gameRepository.getGameByPlayerId(userId);
    if (!game)
      throw new BadRequestException('No games were found with this user!');

    const firstPlayerChoice = game.firstPlayerChoice;
    const secondPlayerChoice = game.secondPlayerChoice;
    const user =
      (game.firstPlayerId as unknown as UserModel).id === userId
        ? (game.firstPlayerId as unknown as UserModel)
        : (game.secondPlayerId as unknown as UserModel);
    const opponent =
      (game.firstPlayerId as unknown as UserModel).id === user.id
        ? (game.secondPlayerId as unknown as UserModel)
        : (game.firstPlayerId as unknown as UserModel);

    if (
      firstPlayerChoice == Choice['not-selected'] ||
      secondPlayerChoice == Choice['not-selected']
    )
      throw new BadRequestException('Both players have to make their choice!');

    let message: string;

    if (firstPlayerChoice === secondPlayerChoice) {
      await this.gameRepository.updateGameById(game.id, {
        firstPlayerChoice: Choice['not-selected'],
        secondPlayerChoice: Choice['not-selected'],
        firstPlayerJoined: false,
        secondPlayerJoined: false,
      });
      message = 'Draw!';
    } else if (
      (firstPlayerChoice == Choice.paper &&
        secondPlayerChoice == Choice.rock) ||
      (firstPlayerChoice == Choice.rock &&
        secondPlayerChoice == Choice.scissors) ||
      (firstPlayerChoice == Choice.scissors &&
        secondPlayerChoice == Choice.paper)
    ) {
      await this.gameRepository.updateGameById(game.id, {
        firstPlayerChoice: Choice['not-selected'],
        secondPlayerChoice: Choice['not-selected'],
        firstPlayerJoined: false,
        secondPlayerJoined: false,
        firstPlayerScore: game.firstPlayerScore + 1,
      });
      message = `${(game.firstPlayerId as unknown as UserModel).username} won!`;
    } else {
      await this.gameRepository.updateGameById(game.id, {
        firstPlayerChoice: Choice['not-selected'],
        secondPlayerChoice: Choice['not-selected'],
        firstPlayerJoined: false,
        secondPlayerJoined: false,
        secondPlayerScore: game.secondPlayerScore + 1,
      });
      message = `${(game.secondPlayerId as unknown as UserModel).username} won!`;
    }

    await this.userRepository.updateUserStatusByUsername(
      user.username,
      UserStatus['in-game'],
    );
    await this.userRepository.updateUserStatusByUsername(
      opponent.username,
      UserStatus['out-of-game'],
    );

    return { message };
  }
}
