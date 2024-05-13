import { Injectable } from '@nestjs/common';
import { RoleSeeder } from './RoleSeeder';
import { UserSeeder } from './UserSeeder';

@Injectable()
export class Seeder {
    constructor(
        private readonly roleSeeder: RoleSeeder,
        private readonly userSeeder: UserSeeder
    ) {}

    async handle() {
        try {
            console.log('Started seeding roles...');
            await this.seedRoles();
            console.log('Successfuly completed seeding roles!');

            console.log('Started seeding users...');
            await this.seedUsers();
            console.log('Successfuly completed seeding users!');
        } catch (error) {
            console.error('Failed seeding db...');
        }
    }

    async seedRoles() {
        return this.roleSeeder.handle();
    }

    async seedUsers() {
        return this.userSeeder.handle();
    }
}
