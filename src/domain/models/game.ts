export enum Choice {
  'rock',
  'paper',
  'scissors',
  'not-selected',
}

export class UpdateGameModel {
  firstPlayerScore: number;
  secondPlayerScore: number;
  firstPlayerChoice: Choice;
  secondPlayerChoice: Choice;
  firstPlayerJoined: boolean;
  secondPlayerJoined: boolean;
}

export class GameModel extends UpdateGameModel {
  id: string;
  createDate: Date;
  firstPlayerId: string;
  secondPlayerId: string;
}
