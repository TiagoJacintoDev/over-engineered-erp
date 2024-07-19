import { prisma } from '../../../shared/infra/database/prisma';
import { PrismaUserRepository } from '../adapters/PrismaUserRepository';
import { type UserRepository } from './user.repository';

interface UserPorts {
  repository: UserRepository;
}

export const userPorts: UserPorts = {
  repository: new PrismaUserRepository(prisma),
};
