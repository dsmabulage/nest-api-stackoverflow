import * as deepMerge from 'deepmerge';

import type {
    DeepPartial,
    FindManyOptions,
    FindOneOptions,
    Repository,
    SaveOptions
} from 'typeorm';

export abstract class AbstractRepository<T extends { id: string }> {
    protected abstract readonly repository: Repository<T>;

    findAll(options: FindManyOptions<T> = {}): Promise<T[]> {
        return this.repository.find(options);
    }

    findAndCountAll(options: FindManyOptions<T> = {}): Promise<[T[], number]> {
        return this.repository.findAndCount(options);
    }

    findOne(options: FindOneOptions<T> = {}): Promise<T | null> {
        return this.repository.findOne(options);
    }

    findById(id: string, options: FindOneOptions<T> = {}): Promise<T | null> {
        const finalOptions = deepMerge(options, { where: { id } });

        return this.repository.findOne(finalOptions);
    }

    create(createInput: DeepPartial<T>, options: SaveOptions = {}): Promise<T> {
        const created = this.repository.create(createInput);

        return this.repository.save(created, options);
    }

    async update(id: string, updateInput: DeepPartial<T>): Promise<T> {
        const preloaded = await this.repository.preload({
            id,
            ...updateInput
        });

        return this.repository.save(preloaded);
    }

    async delete(id: string): Promise<T> {
        const item = await this.findById(id);

        if (!item) {
            return null;
        }

        const removed = await this.repository.remove(item);

        if (!removed.id) {
            removed.id = id;
        }

        return removed;
    }
}
