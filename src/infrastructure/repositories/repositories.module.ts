import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmConfigModule } from '../config/typeorm/typeorm.module';
import { User } from '../entities/user.entity';
import { Game } from '../entities/game.entity';
import { DatabaseUserRepository } from './user.repository';
import { DatabaseGameRepository } from './game.repository';

@Module({
  imports: [TypeOrmConfigModule, TypeOrmModule.forFeature([User, Game])],
  providers: [DatabaseUserRepository, DatabaseGameRepository],
  exports: [DatabaseUserRepository, DatabaseGameRepository],
})
export class RepositoriesModule {}
