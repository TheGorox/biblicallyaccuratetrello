
import { ApiProperty } from '@nestjs/swagger';
import { IsString, Length } from 'class-validator';

export class CreateCardDto {
    // id владельца передаётся в url

    @ApiProperty()
    @IsString()
    @Length(1, 32)
    text: string;
}