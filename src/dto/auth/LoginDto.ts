import { IsEmail, MinLength, MaxLength } from 'class-validator';

export class LoginDto {
    @IsEmail(undefined, {
        message: 'Field should be a valid email'
    })
    email: string;

    @MinLength(8, {
        message: 'Password should contain 8-36 characters'
    })
    @MaxLength(36, {
        message: 'Password should contain 8-36 characters'
    })
    password: string;
}
