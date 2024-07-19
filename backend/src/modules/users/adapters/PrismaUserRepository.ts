import { type User, type PrismaClient } from '@prisma/client';

import { type AsyncMaybe } from '../../../shared/core/Maybe';
import { type UserStatus } from '../core/user-status';
import { type UserType } from '../core/user-type';
import { type UserRepository } from '../ports/user.repository';
import { type UserCommand } from '../user.command';
import { type UserModel } from '../user.model';

export class PrismaUserRepository implements UserRepository {
  constructor(private readonly client: PrismaClient) {}

  async getMany(companyId: string): Promise<UserModel[]> {
    const users = await this.client.user.findMany({
      where: {
        companies: {
          some: {
            id: companyId,
          },
        },
      },
    });

    return users.map(this.prismaToModel);
  }

  async find(companyId: string, userId: string): AsyncMaybe<UserModel> {
    const user = await this.client.user.findFirst({
      where: {
        id: userId,
        companies: {
          some: {
            id: companyId,
          },
        },
      },
    });

    if (!user) {
      return null;
    }

    return this.prismaToModel(user);
  }

  async findByEmail(companyId: string, email: string): AsyncMaybe<UserModel> {
    const user = await this.client.user.findUnique({
      where: {
        email,
        companies: {
          some: {
            id: companyId,
          },
        },
      },
    });

    if (!user) {
      return null;
    }

    return this.prismaToModel(user);
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

  private prismaToModel(this: void, prisma: User): UserModel {
    return {
      ...prisma,
      status: prisma.status as UserStatus,
      type: prisma.type as UserType,
    };
  }
}
