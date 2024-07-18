import { Router } from 'express';

import { userRouter } from '../../../modules/users';

const v1Router = Router();

v1Router.use('/companies/:companyId/users', userRouter);

export { v1Router };
