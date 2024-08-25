import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Comment } from './models/comment.model';

@Injectable()
export class CommentsService {
    constructor(
        @InjectModel(Comment)
        private readonly commentModel: typeof Comment,
    ) { }

    async createComment(userId: number, cardId: number, content: string): Promise<Comment> {
        const comment = new Comment({
            ownerId: userId,
            parentCardId: cardId,
            content
        });

        return comment.save();
    }

    async getCommentsByCard(cardId: number): Promise<Comment[]> {
        return this.commentModel.findAll({ where: { parentCardId: cardId } });
    }

    async getCommentById(commentId: number): Promise<Comment> {
        const comment = await this.commentModel.findOne({ where: { id: commentId} });
        if (!comment) {
            throw new NotFoundException('Comment not found');
        }
        return comment;
    }

    async updateComment(commentId: number, content?: string): Promise<Comment> {
        const comment = await this.getCommentById(commentId);

        if(content){
            comment.content = content;
        }

        return comment.save();
    }

    async deleteComment(commentId: number): Promise<void> {
        const comment = await this.getCommentById(commentId);
        await comment.destroy();
    }
}