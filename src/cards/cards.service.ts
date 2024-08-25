import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Card } from './models/card.model';

@Injectable()
export class CardsService {
    constructor(
        @InjectModel(Card)
        private readonly cardModel: typeof Card,
    ) { }

    async createCard(userId: number, columnId: number, text: string): Promise<Card> {
        const card = new Card({
            ownerId: userId,
            parentColumnId: columnId,
            text
        });

        return card.save();
    }

    async getCardsByColumn(columnId: number): Promise<Card[]> {
        return this.cardModel.findAll({ where: { parentColumnId: columnId } });
    }

    async getCardById(cardId: number): Promise<Card> {
        const card = await this.cardModel.findOne({ where: { id: cardId} });
        if (!card) {
            throw new NotFoundException('Card not found');
        }
        return card;
    }

    async updateCard(cardId: number, text?: string): Promise<Card> {
        const card = await this.getCardById(cardId);

        if(text){
            card.text = text;
        }

        return card.save();
    }

    async deleteCard(cardId: number): Promise<void> {
        const card = await this.getCardById(cardId);
        await card.destroy();
    }
}