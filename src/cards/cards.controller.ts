import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwtAuth.guard';
import { OwnerGuard } from '../common/ownerGuard.guard';
import { IdPipe } from '../pipe/id.pipe';
import { ApiBadRequestResponse, ApiOkResponse, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CardsService } from './cards.service';
import { CardResponseDto } from './dto/cardResponse.dto';
import { UpdateCardDto } from './dto/updateCard.dto';
import { CreateCardDto } from './dto/createCard.dto';

@ApiTags('cards')
@Controller('users/:user_id/columns/:column_id/cards')
@UseGuards(JwtAuthGuard, OwnerGuard)
export class CardsController {
    constructor(private readonly cardsService: CardsService) { }

    @Get(':id')
    @ApiOperation({
        description: 'Get a card by it\'s id'
    })
    @ApiResponse({
        status: 200,
        type: CardResponseDto
    })
    @ApiResponse({
        status: 404,
        description: 'Card with this id not found'
    })
    async findOne(@Param('id', IdPipe) id: number): Promise<CardResponseDto> {
        const card = await this.cardsService.getCardById(id);
        return new CardResponseDto(card);
    }

    @Get()
    @ApiOperation({
        description: 'Get all cards related to the column'
    })
    @ApiResponse({
        status: 200,
        type: CardResponseDto,
        isArray: true
    })
    async getAllCards(@Param('column_id', IdPipe) columnId: number): Promise<CardResponseDto[]> {
        const cards = await this.cardsService.getCardsByColumn(columnId);
        return cards.map(card => new CardResponseDto(card));
    }

    @Post()
    @ApiOperation({
        description: 'Create new card with text'
    })
    @ApiResponse({
        status: 200,
        type: CardResponseDto
    })
    @ApiResponse({
        status: 404,
        description: 'Card with this id not found'
    })
    @ApiBadRequestResponse({
        description: 'Throws detailed validation error message'
    })
    async create(@Param('user_id', IdPipe) userId: number, @Param('column_id', IdPipe) columnId: number, @Body() createCardDto: CreateCardDto): Promise<CardResponseDto> {
        const card = await this.cardsService.createCard(userId, columnId, createCardDto.text);
        return new CardResponseDto(card)
    }

    @Put(':id')
    @ApiOperation({
        description: 'Update the card'
    })
    @ApiResponse({
        status: 200,
        type: CardResponseDto
    })
    @ApiResponse({
        status: 404,
        description: 'Card with this id not found'
    })
    @ApiBadRequestResponse({
        description: 'Throws detailed validation error message'
    })
    async updateCard(@Param('id', IdPipe) id: number, @Body() updateCardDto: UpdateCardDto): Promise<CardResponseDto> {
        const card = await this.cardsService.updateCard(id, updateCardDto.text);
        return new CardResponseDto(card)
    }

    @Delete(':id')
    @ApiOperation({
        description: 'Delete a card by id'
    })
    @ApiOkResponse()
    @ApiResponse({
        status: 404,
        description: 'Card with this id not found'
    })
    async deleteCard(@Param('id', IdPipe) id: number): Promise<void> {
        return this.cardsService.deleteCard(id);
    }
}