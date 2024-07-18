import { userModule } from './ports';
import { UserController } from './user.controller';
import { createUserRouter } from './user.router';
import { UserService } from './user.service';

const userService = new UserService(userModule.repository);
const userController = new UserController(userService);
const userRouter = createUserRouter(userController);

export { userService, userController, userRouter };
