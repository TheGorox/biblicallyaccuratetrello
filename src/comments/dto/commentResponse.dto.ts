import { ApiProperty } from "@nestjs/swagger";
import { Comment } from "../models/comment.model";

export class CommentResponseDto {
    @ApiProperty()
    id: number;
    @ApiProperty()
    content: string;
    @ApiProperty()
    ownerId: number;
    @ApiProperty()
    parentCardId: number

    constructor(comment: Comment) {
        this.id = comment.id;
        this.content = comment.content;
        this.ownerId = comment.ownerId;
        this.parentCardId = comment.parentCardId;
    }
}