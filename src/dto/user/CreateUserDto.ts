import { MinLength, MaxLength } from 'class-validator';

import { UpdateUserDto } from '@/dto/user/UpdateUserDto';

export class CreateUserDto extends UpdateUserDto {
    @MinLength(8, {
        message: 'Password should contain 8-36 characters'
    })
    @MaxLength(36, {
        message: 'Password should contain 8-36 characters'
    })
    password: string;
}
