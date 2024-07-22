import type express from 'express';
import { z } from 'zod';

import { Controller } from '../../../../shared/infra/http/models/Controller';
import { type UserService } from '../../ports/incoming/user.service';

export class UserController extends Controller {
  constructor(private readonly service: UserService) {
    super();
  }

  async getUsers(req: express.Request, res: express.Response) {
    await this.execute(req, res, async (req, res) => {
      const users = await this.service.getUsers();

      res.status(200).json(
        users.map((user) => ({
          id: user.id,
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          status: user.status,
          type: user.type,
          country: user.country,
        })),
      );
    });
  }

  async getUserById(req: express.Request, res: express.Response) {
    await this.execute(req, res, async (req, res) => {
      const user = await this.service.getUserById(req.params.userId);

      res.status(200).json({
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        status: user.status,
        type: user.type,
        country: user.country,
      });
    });
  }

  async createUser(req: express.Request, res: express.Response) {
    await this.execute(req, res, async () => {
      const data = z
        .object({
          email: z.string().email(),
          firstName: z.string(),
          lastName: z.string(),
        })
        .parse(req.body);

      await this.service.createUser(data);

      res.status(201).json({ message: 'User created' });
    });
  }

  async updateUser(req: express.Request, res: express.Response) {
    await this.execute(req, res, async () => {
      const data = z
        .object({
          email: z.string().email(),
          firstName: z.string(),
          lastName: z.string(),
        })
        .parse(req.body);

      await this.service.updateUser(data);

      res.status(200).json({ message: 'User updated' });
    });
  }

  async deleteUser(req: express.Request, res: express.Response) {
    await this.execute(req, res, async () => {
      await this.service.deleteUser(req.params.userId);

      res.status(204).send();
    });
  }

  protected setupRoutes(): void {
    this.router.get('', (req, res) => this.getUsers(req, res));

    this.router.get('/:userId', (req, res) => this.getUserById(req, res));

    this.router.post('', (req, res) => this.createUser(req, res));

    this.router.put('/:userId', (req, res) => this.updateUser(req, res));

    this.router.delete('/:userId', (req, res) => this.deleteUser(req, res));
  }
}
