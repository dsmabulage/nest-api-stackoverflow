import { Module } from '@nestjs/common';

import { AuthController } from '@/controllers/auth.controller';
import { UsersModule } from './users.module';

@Module({
    imports: [UsersModule],
    providers: [],
    controllers: [AuthController]
})
export class AuthModule {}
