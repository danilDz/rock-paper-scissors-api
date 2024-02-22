import { UserModel, UserWithoutPassword } from '../models/user';

export interface UserRepository {
  createUser(username: string, password: string): Promise<UserWithoutPassword>;
  getUserByUsername(username: string): Promise<UserModel>;
  getUserCount(): Promise<number>;
  deleteUserByUsername(username: string): Promise<void>;
}
