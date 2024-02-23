export enum UserStatus {
  'in-game',
  'made-a-choice',
  'out-of-game',
}

export class UserWithoutPassword {
  id: string;
  username: string;
  status: UserStatus;
  isAdmin: boolean;
  createDate: Date;
}

export class UserModel extends UserWithoutPassword {
  password: string;
}
