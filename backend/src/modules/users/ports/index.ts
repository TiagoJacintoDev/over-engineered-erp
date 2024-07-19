import { prisma } from '../../../shared/infra/database/prisma';
import { PrismaUserRepository } from '../adapters/outgoing/PrismaUserRepository';
import { UserService } from './incoming/user.service';

const userRepository = new PrismaUserRepository(prisma);
const userService = new UserService(userRepository);

export { userRepository, userService };
