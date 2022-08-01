import { UserController } from './../controllers/user.controller';
import { Request, Response, Router } from 'express';

const userRouter = Router();
const userController = new UserController();

userRouter.post('/', (req: Request, res: Response) => {
  return userController.create(req, res);
});

userRouter.get('/', (req: Request, res: Response) => {
  return userController.getAll(req, res);
});

userRouter.get('/:id', (req: Request, res: Response) => {
  return userController.getById(req, res);
});

export default userRouter;
