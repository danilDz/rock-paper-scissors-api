import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Game } from './game.entity';

export enum UserStatus {
  'in-game',
  'made-a-choice',
  'out-of-game',
}

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('varchar')
  username: string;

  @CreateDateColumn({ name: 'createDate' })
  createDate: Date;

  @Column('text')
  password: string;

  @Column('varchar')
  status: UserStatus;

  @OneToMany(() => Game, (game) => game.firstPlayerId)
  @OneToMany(() => Game, (game) => game.secondPlayerId)
  games: Game;
}
