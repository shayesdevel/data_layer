import {Knex} from "knex";
import {IEntity} from "../../model/IEntity";
import {Repository} from "./Repository";

export abstract class KnexRepository<T extends IEntity> implements Repository<T> {
    protected constructor(private readonly knex: Knex, private readonly tableName: string) {}

    public get qb(): Knex.QueryBuilder {
        return this.knex(this.tableName)
    }

    async saveOrUpdate(entity: T): Promise<boolean> {
        const exists = await this.existsById(entity.getId());
        return (exists) ? this.update(entity.getId(), entity) : this.save(entity).then();
    }

    private update(id: number, item: Partial<T>): Promise<boolean> {
        return this.qb
            .where('id', id)
            .update(item)
    }

    private async save(item: Omit<T, 'id'>): Promise<boolean> {
        return this.qb.insert<T>(item).then();
    }

    find(item: Partial<T>): Promise<T[]> {
        return this.qb
            .where(item)
            .select()
    }

    findById(id: number): Promise<T> {
        return this.qb
            .where('id', id)
            .select();
    }

    count(): Promise<number> {
        return this.qb
            .count();
    }

    deleteById(id: number): Promise<boolean> {
        return this.qb
            .where('id', id)
            .del();
    }

    async existsById(id: number): Promise<boolean> {
        const query = this.qb.select<[{ count: number }]>(this.knex.raw('COUNT(*)::integer as count'))
        query.where('id', id)
        const exist = await query.first()
        return exist!.count !== 0
    }
}