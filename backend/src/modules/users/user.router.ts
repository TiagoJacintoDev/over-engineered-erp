import { Router } from 'express';

import { type UserController } from './user.controller';

export function createUserRouter(controller: UserController) {
  const router = Router();

  router.get('', (req, res) => controller.getUsers(req, res));

  router.get('/:userId', (req, res) => controller.getUser(req, res));

  router.post('', (req, res) => controller.createUser(req, res));

  router.put('/:userId', (req, res) => controller.updateUser(req, res));

  router.delete('/:userId', (req, res) => controller.deleteUser(req, res));

  return router;
}
