import { IEntity } from '../../model/IEntity';

import { Repository } from './Repository';

class InMemoryRepository<T extends IEntity> implements Repository<T> {
  protected entities: T[] = [];

  public findById(id: number): Promise<T> {
    const entityOrNone = this.entities.find((entity) => entity.getId() === id);
    return entityOrNone ? Promise.resolve(entityOrNone) : Promise.reject('fail');
  }

  deleteById(id: number): Promise<boolean> {
    const entityIndex = this.entities.findIndex((e) => e.getId() === id);
    if (entityIndex) {
      this.entities.splice(entityIndex, 1);
      return Promise.resolve(true);
    }
    return Promise.resolve(false);
  }

  existsById(id: number): Promise<boolean> {
    const existsOrNot = this.entities.some((e) => e.getId() === id);
    return existsOrNot ? Promise.resolve(true) : Promise.reject(false);
  }

  save(entity: T): Promise<boolean> {
    if (!this.entities.includes(entity)) {
      this.entities.push(entity);
      return Promise.resolve(true);
    }
    return Promise.resolve(false);
  }

  updateById(id: number, updated: T): Promise<boolean> {
    const entityIndex = this.entities.findIndex((e) => e.getId() === id);
    if (entityIndex) {
      this.entities[entityIndex] = updated;
      return Promise.resolve(true);
    }
    return Promise.resolve(false);
  }

  count(): Promise<number> {
    return Promise.resolve(this.entities.length);
  }
}

export { InMemoryRepository };
