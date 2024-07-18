import type express from 'express';
import { z } from 'zod';

import { type UserService } from './user.service';

abstract class Controller {
  protected async execute(
    req: express.Request,
    res: express.Response,
    cb: (req: express.Request, res: express.Response) => Promise<unknown>,
  ) {
    try {
      await cb(req, res);
    } catch (error) {
      res.status(500).json({ error: error instanceof Error ? error.message : String(error) });
    }
  }
}

export class UserController extends Controller {
  constructor(private readonly service: UserService) {
    super();
  }

  async getUsers(req: express.Request, res: express.Response) {
    await this.execute(req, res, async (req, res) => {
      const users = await this.service.getUsers(req.params.companyId);

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

  async getUser(req: express.Request, res: express.Response) {
    await this.execute(req, res, async (req, res) => {
      const user = await this.service.getUser(req.params.companyId, req.params.userId);

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
          companyId: z.string(),
        })
        .parse({ ...req.body, companyId: req.params.companyId });

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
          companyId: z.string(),
        })
        .parse({ ...req.body, companyId: req.params.companyId });

      await this.service.updateUser(data);

      res.status(200).json({ message: 'User updated' });
    });
  }

  async deleteUser(req: express.Request, res: express.Response) {
    await this.execute(req, res, async () => {
      await this.service.deleteUser(req.params.companyId, req.params.userId);

      res.status(204).send();
    });
  }
}
