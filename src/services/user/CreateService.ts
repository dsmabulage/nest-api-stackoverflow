import { Injectable } from '@nestjs/common';

import { ROLE_NAMES } from '@/entities/Role';
import { UserRepository } from '@/repositories/User';
import { RoleRepository } from '@/repositories/Role';
import { CreateUserDto } from '@/dto/user/CreateUserDto';
import { BadRequestException } from '@/exceptions/bad.request.exception';

import type { User } from '@/entities/User';

@Injectable()
export class CreateService {
    constructor(
        private userRepository: UserRepository,
        private roleRepository: RoleRepository
    ) {}

    async handle(data: CreateUserDto, loggedUser: User): Promise<User> {
        const { isAdmin, email } = data;

        const user = await this.userRepository.findByEmail(email, {
            withDeleted: true
        });

        if (user) {
            throw new BadRequestException({
                param: 'email',
                message: 'User with this email already exists'
            });
        }

        if (data.isAdmin && loggedUser.createdBy) {
            throw new BadRequestException({
                param: 'general',
                message: 'You are not allowed to create administrators'
            });
        }

        const [adminRole, userRole] = await Promise.all([
            this.roleRepository.findOne({
                where: { name: ROLE_NAMES.ADMIN }
            }),
            this.roleRepository.findOne({
                where: { name: ROLE_NAMES.USER }
            })
        ]);

        let createdUser = await this.userRepository.create({
            ...data,
            createdBy: null,
            role: isAdmin ? adminRole : userRole
        });

        if (createdUser.password) {
            createdUser = await this.userRepository.findById(createdUser.id);
        }

        return createdUser;
    }
}
