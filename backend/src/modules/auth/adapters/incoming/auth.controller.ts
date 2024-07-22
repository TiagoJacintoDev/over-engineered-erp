import type express from 'express';
import { z } from 'zod';

import { Controller } from '../../../../shared/infra/http/models/Controller';
import { type AuthService } from '../../ports/incoming/auth.service';

export class AuthController extends Controller {
  constructor(private readonly authService: AuthService) {
    super();
  }

  async signup(req: express.Request, res: express.Response) {
    await this.execute(req, res, async (req, res) => {
      const data = z
        .object({
          email: z.string().email(),
          password: z.string(),
          firstName: z.string(),
          lastName: z.string(),
          country: z.string(),
        })
        .parse(req.body);

      const userId = await this.authService.signup(data);

      res.status(201).json({ userId });
    });
  }

  async login(req: express.Request, res: express.Response) {
    await this.execute(req, res, async () => {
      const data = z
        .object({
          email: z.string().email(),
          password: z.string(),
        })
        .parse(req.body);

      const userId = await this.authService.login(data);

      res.status(200).json({ userId });
    });
  }

  protected setupRoutes() {
    this.router.post('/signup', (req, res) => this.signup(req, res));
    this.router.post('/login', (req, res) => this.login(req, res));
  }

  getRouter() {
    return this.router;
  }
}
