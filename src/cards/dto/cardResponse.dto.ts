import { ApiProperty } from "@nestjs/swagger";
import { Card } from "../models/card.model";

export class CardResponseDto {
    @ApiProperty()
    id: number;
    @ApiProperty()
    text: string;
    @ApiProperty()
    ownerId: number;
    @ApiProperty()
    parentColumnId: number;

    constructor(card: Card) {
        this.id = card.id;
        this.text = card.text;
        this.ownerId = card.ownerId;
        this.parentColumnId = card.parentColumnId;
    }
}