import { User } from '../model/User';

import { InMemoryRepository } from './base/InMemoryRepository';

class UserRepository extends InMemoryRepository<User> {
  existsByName(name: string): Promise<boolean> {
    const existsOrNot = this.entities.some((e) => e.getName() === name);
    return existsOrNot ? Promise.resolve(existsOrNot) : Promise.reject(false);
  }
}

export { UserRepository };
