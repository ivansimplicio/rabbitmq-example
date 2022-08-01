import { User } from './../models/user.model';
import { UserRepository } from './../repositories/user.repository';

export class UserService {
  private userRepository: UserRepository;

  constructor() {
    this.userRepository = new UserRepository();
  }

  public insert(user: User): User {
    return this.userRepository.create(user);
  }

  public getAll(): User[] {
    return this.userRepository.findAll();
  }

  public getById(id: string): User {
    return this.userRepository.find(id);
  }
}
