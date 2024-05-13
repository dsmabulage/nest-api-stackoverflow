import {
    Injectable,
    NotFoundException,
    ForbiddenException
} from '@nestjs/common';
import { BadRequestException } from '@/exceptions/bad.request.exception';

import { ROLE_NAMES } from '@/entities/Role';
import { UserRepository } from '@/repositories/User';
import { RoleRepository } from '@/repositories/Role';
import { UpdateUserDto } from '@/dto/user/UpdateUserDto';

import type { User } from '@/entities/User';

@Injectable()
export class UpdateService {
    constructor(
        private userRepository: UserRepository,
        private roleRepository: RoleRepository
    ) {}

    async handle(
        id: string,
        data: UpdateUserDto,
        loggedUser: User
    ): Promise<User> {
        const { isAdmin } = data;

        const [userByEmail, userToUpdate] = await Promise.all([
            this.userRepository.findByEmail(data.email),
            this.userRepository.findById(id, { relations: { role: true } })
        ]);

        if (!userToUpdate) {
            throw new NotFoundException();
        }

        if (userByEmail && userByEmail.id !== id) {
            throw new BadRequestException({
                message: 'User with this email already exists',
                param: 'email'
            });
        }

        const [{ createdBy: loggedUserCreatedBy }, adminRole, userRole] =
            await Promise.all([
                this.userRepository.findOne({
                    where: { id: loggedUser.id },
                    relations: { createdBy: true }
                }),
                this.roleRepository.findOne({
                    where: { name: ROLE_NAMES.ADMIN }
                }),
                this.roleRepository.findOne({
                    where: { name: ROLE_NAMES.USER }
                })
            ]);

        if (
            loggedUserCreatedBy &&
            userToUpdate.role.name === ROLE_NAMES.ADMIN
        ) {
            throw new BadRequestException({
                message: "This user can't be updated by you",
                param: 'general'
            });
        }

        if (loggedUserCreatedBy && isAdmin) {
            throw new BadRequestException({
                message: "You can't assign administrator permissions to user",
                param: 'email'
            });
        }

        if (
            !loggedUserCreatedBy &&
            !isAdmin &&
            loggedUser.id === userToUpdate.id
        ) {
            throw new ForbiddenException();
        }

        return this.userRepository.update(id, {
            ...data,
            role: isAdmin ? adminRole : userRole
        });
    }
}
