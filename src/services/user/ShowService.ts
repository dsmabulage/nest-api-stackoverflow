import { Injectable, NotFoundException } from '@nestjs/common';

import { UserRepository } from '@/repositories/User';

import type { User } from '@/entities/User';

@Injectable()
export class ShowService {
    constructor(private userRepository: UserRepository) {}

    async handle(id: string): Promise<User> {
        const user = await this.userRepository.findById(id);

        if (!user) {
            throw new NotFoundException();
        }

        return user;
    }
}
