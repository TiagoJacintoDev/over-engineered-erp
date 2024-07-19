import { type PrismaClient, type User } from '@prisma/client';

import { type AsyncMaybe } from '../../../shared/core/Maybe';
import { type UserRepository } from '../ports/user.repository';
import { type UserCommand } from '../user.command';

export class PrismaUserRepository implements UserRepository {
  constructor(private readonly client: PrismaClient) {}

  async getMany(companyId: string): Promise<User[]> {
    return this.client.user.findMany({
      where: {
        companies: {
          some: {
            id: companyId,
          },
        },
      },
    });
  }

  async find(companyId: string, userId: string): AsyncMaybe<User> {
    return this.client.user.findFirst({
      where: {
        id: userId,
        companies: {
          some: {
            id: companyId,
          },
        },
      },
    });
  }

  async findByEmail(companyId: string, email: string): AsyncMaybe<User> {
    return this.client.user.findUnique({
      where: {
        email,
        companies: {
          some: {
            id: companyId,
          },
        },
      },
    });
  }

  async create(payload: UserCommand): Promise<void> {
    await this.client.user.create({
      data: {
        email: payload.email,
        firstName: payload.firstName,
        lastName: payload.lastName,
        companies: {
          connect: {
            id: payload.companyId,
          },
        },
      },
    });
  }

  async update(command: UserCommand): Promise<void> {
    await this.client.user.update({
      where: {
        email: command.email,
        companies: {
          some: {
            id: command.companyId,
          },
        },
      },
      data: {
        firstName: command.firstName,
        lastName: command.lastName,
        email: command.email,
      },
    });
  }

  async delete(companyId: string, userId: string): Promise<void> {
    await this.client.user.delete({
      where: {
        id: userId,
        companies: {
          some: {
            id: companyId,
          },
        },
      },
    });
  }
}
