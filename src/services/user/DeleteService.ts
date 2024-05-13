import { Injectable, ForbiddenException } from '@nestjs/common';

import { UserRepository } from '@/repositories/User';

import type { User } from '@/entities/User';

@Injectable()
export class DeleteService {
    constructor(private userRepository: UserRepository) {}

    async handle(id: string, loggedUser: User): Promise<User | null> {
        const { id: loggedUserId } = loggedUser;

        const user = await this.userRepository.findById(id);

        if (!user) {
            return null;
        }

        const { createdBy: loggedUserCreatedBy } =
            await this.userRepository.findOne({
                where: { id: loggedUserId },
                relations: { createdBy: true }
            });

        if (loggedUserCreatedBy?.id === user.id) {
            throw new ForbiddenException();
        }

        if (loggedUserId === id) {
            throw new ForbiddenException();
        }

        return this.userRepository.update(user.id, {
            deletedAt: new Date()
        });
    }
}
