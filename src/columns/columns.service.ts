import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { BoardColumn } from './models/column.model';

@Injectable()
export class ColumnsService {
    constructor(
        @InjectModel(BoardColumn)
        private readonly columnModel: typeof BoardColumn,
    ) { }

    async createColumn(userId: number, title: string): Promise<BoardColumn> {
        const column = new BoardColumn({
            ownerId: userId,
            title
        });

        return column.save();
    }

    async getColumnsByUser(userId: number): Promise<BoardColumn[]> {
        return this.columnModel.findAll({ where: { ownerId: userId } });
    }

    async getColumnById(columnId: number): Promise<BoardColumn> {
        const column = await this.columnModel.findOne({ where: { id: columnId} });
        if (!column) {
            throw new NotFoundException('Column not found');
        }
        return column;
    }

    async updateColumn(columnId: number, title?: string): Promise<BoardColumn> {
        const column = await this.getColumnById(columnId);

        if(title){
            column.title = title;
        }

        return column.save();
    }

    async deleteColumn(columnId: number): Promise<void> {
        const column = await this.getColumnById(columnId);
        await column.destroy();
    }
}