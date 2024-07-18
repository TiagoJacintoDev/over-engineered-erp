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

    for (const value of Object.values(data)) {
      if (!value) {
        return res.status(400).json({ error: 'All fields are required' });
      }
    }

    const user = await prisma.user.findUnique({
      where: {
        email: data.email,
      },
    });

    if (user) return res.status(400).json({ error: 'User already exists' });

    await prisma.user.create({
      data: {
        country: data.country,
        email: data.email,
        name: `${data.firstName} ${data.lastName}`,
        password: await bcrypt.hash(data.password, 10),
        companies: {
          create: {
            name: data.companyName,
          },
        },
      },
    });

    return res.status(200).json({ companyName: data.companyName });
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

    for (const value of Object.keys(data)) {
      if (!value) {
        return res.status(400).json({
          error: 'All fields are required',
        });
      }
    }

    const user = await prisma.user.findUnique({
      where: {
        email: data.email,
      },
    });

    if (!user) return res.status(400).json({ error: 'User not found' });

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

const port = 3000;

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
