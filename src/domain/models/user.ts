export class UserWithoutPassword {
  id: string;
  username: string;
  createDate: Date;
}

export class UserModel extends UserWithoutPassword {
  password: string;
}
