import { Module } from '@nestjs/common';

import { RoleSeeder } from '@/services/seeder/RoleSeeder';
import { UserSeeder } from '@/services/seeder/UserSeeder';
import { Seeder } from '@/services/seeder/seeder';
import { RolesModule } from './roles.module';
import { UsersModule } from './users.module';
import { DatabaseModule } from './database.module';

@Module({
    imports: [DatabaseModule, RolesModule, UsersModule],
    providers: [RoleSeeder, UserSeeder, Seeder]
})
export class SeederModule {}
