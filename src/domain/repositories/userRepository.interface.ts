import { UserStatus } from 'src/infrastructure/entities/user.entity';
import { UserModel, UserWithoutPassword } from '../models/user';

export interface UserRepository {
  createUser(username: string, password: string): Promise<UserWithoutPassword>;
  getUserByUsername(username: string): Promise<UserModel>;
  updateUserStatusByUsername(
    username: string,
    status: UserStatus,
  ): Promise<void>;
  getUserCount(): Promise<number>;
  deleteUserByUsername(username: string): Promise<void>;
}
