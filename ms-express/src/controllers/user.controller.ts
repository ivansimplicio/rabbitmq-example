import { Request, Response } from 'express';
import { UserService } from './../services/user.service';

export class UserController {
  private userService: UserService;

  constructor() {
    this.userService = new UserService();
  }

  public create(request: Request, response: Response) {
    const user = this.userService.insert(request.body);
    response.status(201).json({ user });
  }

  public getAll(_request: Request, response: Response) {
    const users = this.userService.getAll();
    response.status(200).json({ users });
  }

  public getById(request: Request, response: Response) {
    const user = this.userService.getById(request.params.id);
    response.status(200).json({ user });
  }
}
