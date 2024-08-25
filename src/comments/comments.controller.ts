import { Body, Controller, Delete, Get, Param, Post, Put, Req, UseGuards } from '@nestjs/common';

import { JwtAuthGuard } from '../auth/jwtAuth.guard';
import { OwnerGuard } from '../common/ownerGuard.guard';
import { IdPipe } from '../pipe/id.pipe';
import { ApiBadRequestResponse, ApiOkResponse, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CommentsService } from './comments.service';
import { UpdateCommentDto } from './dto/updateComment.dto';
import { CreateCommentDto } from './dto/createComment.dto';
import { CommentResponseDto } from './dto/commentResponse.dto';

@ApiTags('comments')
@Controller('users/:user_id/columns/:column_id/cards/:card_id/comments')
@UseGuards(JwtAuthGuard, OwnerGuard)
export class CommentsController {
    constructor(private readonly commentsService: CommentsService) { }

    @Get(':id')
    @ApiOperation({
        description: 'Get a comment by it\'s id'
    })
    @ApiResponse({
        status: 200,
        type: CommentResponseDto
    })
    @ApiResponse({
        status: 404,
        description: 'Comment with this id not found'
    })
    async findOne(@Param('id', IdPipe) id: number): Promise<CommentResponseDto> {
        const column = await this.commentsService.getCommentById(id);
        return new CommentResponseDto(column);
    }

    @Get()
    @ApiOperation({
        description: 'Get all comments related to the card'
    })
    @ApiResponse({
        status: 200,
        type: CommentResponseDto,
        isArray: true
    })
    async getAllComments(@Param('card_id', IdPipe) cardId: number): Promise<CommentResponseDto[]> {
        const comments = await this.commentsService.getCommentsByCard(cardId);
        return comments.map(column => new CommentResponseDto(column));
    }

    @Post()
    @ApiResponse({
        status: 200,
        type: CommentResponseDto
    })
    @ApiResponse({
        status: 404,
        description: 'Comment with this id not found'
    })
    @ApiBadRequestResponse({
        description: 'Throws detailed validation error message'
    })
    async create(@Param('user_id', IdPipe) userId: number, @Param('column_id', IdPipe) columnId: number, @Body() createCommentDto: CreateCommentDto): Promise<CommentResponseDto> {
        const column = await this.commentsService.createComment(userId, columnId, createCommentDto.content);
        return new CommentResponseDto(column)
    }

    @Put(':id')
    @ApiOperation({
        description: 'Updates comment'
    })
    @ApiResponse({
        status: 200,
        type: CommentResponseDto
    })
    @ApiResponse({
        status: 404,
        description: 'Comment with this id not found'
    })
    @ApiBadRequestResponse({
        description: 'Throws detailed validation error message'
    })
    async updateComment(@Param('id', IdPipe) id: number, @Body() updateCommentDto: UpdateCommentDto): Promise<CommentResponseDto> {
        const column = await this.commentsService.updateComment(id, updateCommentDto.content);
        return new CommentResponseDto(column)
    }

    @Delete(':id')
    @ApiOperation({
        description: 'Deletes comment'
    })
    @ApiOkResponse()
    @ApiResponse({
        status: 404,
        description: 'Comment with this id not found'
    })
    async deleteComment(@Param('id', IdPipe) id: number): Promise<void> {
        return this.commentsService.deleteComment(id);
    }
}