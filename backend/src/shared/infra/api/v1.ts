import { Router } from 'express';

import { authController } from '../../../modules/auth/adapters';
import { userController } from '../../../modules/users/adapters';

const v1Router = Router();

v1Router.use('/users', userController.router);
v1Router.use('/auth', authController.router);

export { v1Router };
