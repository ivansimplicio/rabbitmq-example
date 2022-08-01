import { User } from './../models/user.model';
import { v4 as uuidv4 } from 'uuid';

export class UserRepository {
  private users: User[] = [];

  public create(user: User): User {
    user.id = uuidv4();
    this.users.push(user);
    return user;
  }

  public findAll(): User[] {
    return this.users;
  }

  public find(id: string): User {
    return this.users.find((user) => user.id === id) as User;
  }
}
