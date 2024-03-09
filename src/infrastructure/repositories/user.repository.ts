import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserModel, UserWithoutPassword } from '../../domain/models/user';
import { UserRepository } from '../../domain/repositories/userRepository.interface';
import { User } from '../entities/user.entity';
import { UserStatus } from '../../domain/models/user';

@Injectable()
export class DatabaseUserRepository implements UserRepository {
  constructor(
    @InjectRepository(User)
    private readonly userEntityRepository: Repository<User>,
  ) {}

  async createUser(
    username: string,
    password: string,
    isAdmin: boolean,
  ): Promise<UserWithoutPassword> {
    const user = this.userEntityRepository.create({
      username: username,
      password: password,
      isAdmin,
      status: UserStatus['in-game'],
    });
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

  async updateUserStatusByUsername(
    username: string,
    status: UserStatus,
  ): Promise<void> {
    await this.userEntityRepository
      .createQueryBuilder()
      .update(User)
      .set({ status })
      .where('username = :username', { username })
      .execute();
  }

  async getRegularUsers(): Promise<string[]> {
    return (
      await this.userEntityRepository.find({ where: { isAdmin: false } })
    ).map((item) => item.id);
  }

  async deleteUserByUsername(username: string): Promise<void> {
    await this.userEntityRepository.delete({ username });
  }

  private toUserWithoutPassword(userEntity: User): UserWithoutPassword {
    const user = new UserWithoutPassword();
    user.createDate = userEntity.createDate;
    user.id = userEntity.id;
    user.username = userEntity.username;
    user.isAdmin = userEntity.isAdmin;
    user.status = userEntity.status;
    return user;
  }

  private toUser(userEntity: User): UserModel {
    const user = new UserModel();
    user.createDate = userEntity.createDate;
    user.id = userEntity.id;
    user.password = userEntity.password;
    user.username = userEntity.username;
    user.isAdmin = userEntity.isAdmin;
    user.status = userEntity.status;
    return user;
  }
}
