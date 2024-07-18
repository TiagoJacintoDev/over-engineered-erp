import { type User } from '@prisma/client';

import { type AsyncMaybe } from '../../../shared/core/Maybe';
import { type UserCommand } from '../user.command';

export interface UserRepository {
  getMany(companyId: string): Promise<User[]>;
  find(companyId: string, userId: string): AsyncMaybe<User>;
  findByEmail(companyId: string, email: string): AsyncMaybe<User>;
  create(command: UserCommand): Promise<void>;
  update(command: UserCommand): Promise<void>;
  delete(companyId: string, userId: string): Promise<void>;
}
