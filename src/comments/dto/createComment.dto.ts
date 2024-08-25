
import { ApiProperty } from '@nestjs/swagger';
import { IsString, Length } from 'class-validator';

export class CreateCommentDto {
    // id владельца передаётся в url
    // todo: id комментатора

    @ApiProperty()
    @IsString()
    @Length(1, 32)
    content: string;
}