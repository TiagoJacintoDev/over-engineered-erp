import { type User, type PrismaClient } from '@prisma/client';

import { type AsyncMaybe } from '../../../../shared/core/Maybe';
import { type UserStatus } from '../../core/user-status';
import { type UserType } from '../../core/user-type';
import { type UserCommand } from '../../core/user.command';
import { type UserModel } from '../../core/user.model';
import { type UserRepository } from '../../ports/outgoing/user.repository';

export class PrismaUserRepository implements UserRepository {
  constructor(private readonly client: PrismaClient) {}

  async getMany(): Promise<UserModel[]> {
    const users = await this.client.user.findMany();

    return users.map(PrismaUserRepository.prismaToModel);
  }

  async findById(userId: string): AsyncMaybe<UserModel> {
    const user = await this.client.user.findFirst({
      where: {
        id: userId,
      },
    });

    if (!user) {
      return null;
    }

    return PrismaUserRepository.prismaToModel(user);
  }

  async findByEmail(email: string): AsyncMaybe<UserModel> {
    const user = await this.client.user.findUnique({
      where: {
        email,
      },
    });

    if (!user) {
      return null;
    }

    return PrismaUserRepository.prismaToModel(user);
  }

  async create(payload: UserCommand): Promise<void> {
    await this.client.user.create({
      data: {
        email: payload.email,
        firstName: payload.firstName,
        lastName: payload.lastName,
        password: payload.password,
        country: payload.country,
      },
    });
  }

  async update(command: UserCommand): Promise<void> {
    await this.client.user.update({
      where: {
        email: command.email,
      },
      data: {
        firstName: command.firstName,
        lastName: command.lastName,
        email: command.email,
        password: command.password,
        country: command.country,
      },
    });
  }

  async delete(userId: string): Promise<void> {
    await this.client.user.delete({
      where: {
        id: userId,
      },
    });
  }

  public static prismaToModel(this: void, prisma: User): UserModel {
    return {
      ...prisma,
      status: prisma.status as UserStatus,
      type: prisma.type as UserType,
    };
  }
}
