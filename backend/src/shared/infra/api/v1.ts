import { Router } from 'express';

import { userController } from '../../../modules/users/adapters';

const v1Router = Router();

v1Router.use('/companies/:companyId/users', userController.router);

export { v1Router };
