interface Repository<T> {
  findById(id: number): Promise<T>;
  deleteById(id: number): Promise<boolean>;
  existsById(id: number): Promise<boolean>;
  count(): Promise<number>;
}

export type { Repository };
