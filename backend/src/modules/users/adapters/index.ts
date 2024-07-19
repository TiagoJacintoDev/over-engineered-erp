import { userService } from '../ports';
import { UserController } from './incoming/user.controller';

const userController = new UserController(userService);

export { userController };
