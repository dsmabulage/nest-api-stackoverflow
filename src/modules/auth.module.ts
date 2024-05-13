import { Module, forwardRef } from '@nestjs/common';

import { MeService } from '@/services/Auth/MeService';
import { LoginService } from '@/services/Auth/LoginService';
import { AuthController } from '@/controllers/auth.controller';
import { LogoutService } from '@/services/auth/LogoutService';
import { UsersModule } from './users.module';

@Module({
    imports: [forwardRef(() => UsersModule)],
    providers: [MeService, LoginService, LogoutService],
    controllers: [AuthController]
})
export class AuthModule {}
