import bcrypt from 'bcrypt';
import cors from 'cors';
import express from 'express';
import { z } from 'zod';

import { prisma } from './prisma';

const app = express();

app.use(express.json());
app.use(cors());

app.post('/api/signup', async (req, res) => {
  try {
    const data = z
      .object({
        country: z.string(),
        email: z.string().email(),
        firstName: z.string(),
        lastName: z.string(),
        password: z.string(),
        companyName: z.string(),
      })
      .parse(req.body);

    const user = await prisma.user.findUnique({
      where: {
        email: data.email,
      },
    });

    if (user) return res.status(400).json({ error: 'User already exists' });

    const createdUser = await prisma.user.create({
      data: {
        email: data.email,
        firstName: data.firstName,
        lastName: data.lastName,
        country: data.country,
        password: await bcrypt.hash(data.password, 10),
        companies: {
          create: {
            name: data.companyName,
          },
        },
      },
      select: {
        companies: {
          select: {
            id: true,
          },
        },
      },
    });

    return res.status(200).json({ companyId: createdUser.companies[0].id });
  } catch (error) {
    return res.status(500).json({ error: error instanceof Error ? error.message : String(error) });
  }
});

app.post('/api/login', async (req, res) => {
  try {
    const data = z
      .object({
        email: z.string().email(),
        password: z.string(),
      })
      .parse(req.body);

    const user = await prisma.user.findUnique({
      where: {
        email: data.email,
      },
    });

    if (!user) return res.status(400).json({ error: 'User not found' });

    if (!user.password) return res.status(400).json({ error: 'User has no password' });

    const passwordMatches = await bcrypt.compare(data.password, user.password);

    if (!passwordMatches) return res.status(400).json({ error: 'Invalid credentials' });

    res.status(200).json({ userId: user.id });
  } catch (error) {
    res.status(500).json({ error: error instanceof Error ? error.message : String(error) });
  }
});

app.get('/api/user/:userId/companies', async (req, res) => {
  try {
    const companies = await prisma.company.findMany({
      where: {
        users: {
          some: {
            id: req.params.userId,
          },
        },
      },
    });

    res.status(200).json(companies);
  } catch (error) {
    res.status(500).json({ error: error instanceof Error ? error.message : String(error) });
  }
});

app.get('/api/company/:companyId/users', async (req, res) => {
  try {
    const users = await prisma.user.findMany({
      where: {
        companies: {
          some: {
            id: req.params.companyId,
          },
        },
      },
    });

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
  } catch (error) {
    res.status(500).json({ error: error instanceof Error ? error.message : String(error) });
  }
});

app.get('/api/company/:companyId/user/:userId', async (req, res) => {
  try {
    const user = await prisma.user.findFirst({
      where: {
        id: req.params.userId,
        companies: {
          some: {
            id: req.params.companyId,
          },
        },
      },
    });

    if (!user) return res.status(404).json({ error: 'User not found' });

    return res.status(200).json({
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      status: user.status,
      type: user.type,
      country: user.country,
    });
  } catch (error) {
    return res.status(500).json({ error: error instanceof Error ? error.message : String(error) });
  }
});

app.post('/api/company/:companyId/user', async (req, res) => {
  try {
    const data = z
      .object({
        email: z.string().email(),
        firstName: z.string(),
        lastName: z.string(),
      })
      .parse(req.body);

    console.log(req.params.companyId);

    const user = await prisma.user.create({
      data: {
        email: data.email,
        firstName: data.firstName,
        lastName: data.lastName,
        companies: {
          connect: {
            id: req.params.companyId,
          },
        },
      },
    });

    return res.status(200).json(user);
  } catch (error) {
    return res.status(500).json({ error: error instanceof Error ? error.message : String(error) });
  }
});

app.put('/api/company/:companyId/user/:userId', async (req, res) => {
  try {
    const data = z
      .object({
        email: z.string().email(),
        firstName: z.string(),
        lastName: z.string(),
      })
      .parse(req.body);

    const user = await prisma.user.update({
      where: {
        id: req.params.userId,
      },
      data,
    });

    return res.status(200).json(user);
  } catch (error) {
    return res.status(500).json({ error: error instanceof Error ? error.message : String(error) });
  }
});

app.delete('/api/company/:companyId/user/:userId', async (req, res) => {
  try {
    await prisma.user.delete({
      where: {
        id: req.params.userId,
      },
    });

    return res.status(204).send();
  } catch (error) {
    return res.status(500).json({ error: error instanceof Error ? error.message : String(error) });
  }
});

const port = 3000;

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
