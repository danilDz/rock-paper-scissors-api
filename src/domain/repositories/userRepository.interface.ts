import { UserModel, UserWithoutPassword } from '../models/user';
import { UserStatus } from '../models/user';

export interface UserRepository {
  createUser(
    username: string,
    password: string,
    isAdmin: boolean,
  ): Promise<UserWithoutPassword>;
  getUserByUsername(username: string): Promise<UserModel>;
  updateUserStatusByUsername(
    username: string,
    status: UserStatus,
  ): Promise<void>;
  getRegularUsers(): Promise<string[]>;
  deleteUserByUsername(username: string): Promise<void>;
}
