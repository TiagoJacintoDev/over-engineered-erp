import express from 'express';

export abstract class Controller {
  public readonly router = express.Router();

  constructor() {
    this.setupRoutes();
  }

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

  protected abstract setupRoutes(): void;
}
