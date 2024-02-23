import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Game } from './game.entity';
import { UserStatus } from 'src/domain/models/user';

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

  @Column('boolean')
  isAdmin: boolean;

  @OneToMany(() => Game, (game) => game.firstPlayerId)
  @OneToMany(() => Game, (game) => game.secondPlayerId)
  games: Game;
}
