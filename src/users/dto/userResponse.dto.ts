// фильтратор ответа, чтобы не отдавать внутренние поля

import { ApiProperty } from "@nestjs/swagger";
import { User } from "../models/user.model";

export class UserResponseDto {
    @ApiProperty()
    id: number;
    @ApiProperty()
    nickname: string;
    @ApiProperty()
    email: string;

    constructor(user: User) {
        this.id = user.id;
        this.nickname = user.nickname;
        this.email = user.email;
    }
}