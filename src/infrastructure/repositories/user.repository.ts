import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserModel, UserWithoutPassword } from '../../domain/models/user';
import { UserRepository } from '../../domain/repositories/userRepository.interface';
import { User } from '../entities/user.entity';

@Injectable()
export class DatabaseUserRepository implements UserRepository {
  constructor(
    @InjectRepository(User)
    private readonly userEntityRepository: Repository<User>,
  ) {}

  async createUser(
    username: string,
    password: string,
  ): Promise<UserWithoutPassword> {
    const user = await this.userEntityRepository.create({ username, password });
    await this.userEntityRepository.save(user);
    return this.toUserWithoutPassword(user);
  }

  async getUserByUsername(username: string): Promise<UserModel> {
    const user = await this.userEntityRepository.findOne({
      where: { username },
    });
    if (!user) return null;
    return this.toUser(user);
  }

  async getUserCount(): Promise<number> {
    return await this.userEntityRepository.count();
  }

  async deleteUserByUsername(username: string): Promise<void> {
    await this.userEntityRepository.delete({ username });
  }

  private toUserWithoutPassword(userEntity: User): UserWithoutPassword {
    const user = new UserWithoutPassword();
    user.createDate = userEntity.createDate;
    user.id = userEntity.id;
    user.username = userEntity.username;
    return user;
  }

  private toUser(userEntity: User): UserModel {
    const user = new UserModel();
    user.createDate = userEntity.createDate;
    user.id = userEntity.id;
    user.username = userEntity.password;
    user.username = userEntity.username;
    return user;
  }
}
