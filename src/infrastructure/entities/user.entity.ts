import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

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
}
