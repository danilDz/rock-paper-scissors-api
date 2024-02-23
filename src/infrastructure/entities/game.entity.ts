import {
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  CreateDateColumn,
} from 'typeorm';
import { User } from './user.entity';
import { Choice } from 'src/domain/models/game';

@Entity()
export class Game {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @CreateDateColumn({ name: 'createDate' })
  createDate: Date;

  @ManyToOne(() => User, (user) => user.games)
  firstPlayerId: string;

  @ManyToOne(() => User, (user) => user.games)
  secondPlayerId: string;

  @Column('int')
  firstPlayerScore: number;

  @Column('int')
  secondPlayerScore: number;

  @Column('varchar')
  firstPlayerChoice: Choice;

  @Column('varchar')
  secondPlayerChoice: Choice;
}
