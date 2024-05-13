import { Injectable } from '@nestjs/common';
import { UserRepository } from '@/repositories/User';
import type { User } from '@/entities/User';

@Injectable()
export class IndexService {
    constructor(private userRepository: UserRepository) {}

    async handle(): Promise<{
        rows: User[];
        count: number;
    }> {
        const [rows, count] = await this.userRepository.findAndCountAll();

        return { rows, count };
    }
}
