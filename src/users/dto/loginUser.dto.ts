import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, Length, MaxLength, MinLength } from 'class-validator';

export class LoginUserDto {
    @ApiProperty()
    @IsNotEmpty()
    @IsEmail()
    @MaxLength(32)
    email: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    @Length(3, 32)
    password: string;
}