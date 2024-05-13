import {
    IsEmail,
    MinLength,
    MaxLength,
    IsBoolean,
    IsOptional
} from 'class-validator';

export class UpdateUserDto {
    @MinLength(1, {
        message: 'Field should contain 1-20 characters'
    })
    @MaxLength(20, {
        message: 'Field should contain 1-20 characters'
    })
    firstName: string;

    @MinLength(1, {
        message: 'Field should contain 1-20 characters'
    })
    @MaxLength(20, {
        message: 'Field should contain 1-20 characters'
    })
    lastName: string;

    @IsEmail(undefined, {
        message: 'Field should be a valid email'
    })
    email: string;

    @IsOptional()
    @MinLength(8, {
        message: 'Password should contain 8-36 characters'
    })
    @MaxLength(36, {
        message: 'Password should contain 8-36 characters'
    })
    password: string;

    @IsBoolean({ message: 'Field should be boolean' })
    isAdmin: boolean;
}
