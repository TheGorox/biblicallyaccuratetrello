import { ApiProperty } from "@nestjs/swagger";
import { BoardColumn } from "../models/column.model";

export class ColumnResponseDto {
    @ApiProperty()
    id: number;
    @ApiProperty()
    title: string;
    @ApiProperty()
    ownerId: number;

    constructor(column: BoardColumn) {
        this.id = column.id;
        this.title = column.title;
        this.ownerId = column.ownerId;
    }
}