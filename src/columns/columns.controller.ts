import { Body, Controller, Delete, Get, Param, Post, Put, Req, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwtAuth.guard';
import { OwnerGuard } from '../common/ownerGuard.guard';
import { ColumnsService } from './columns.service';
import { IdPipe } from '../pipe/id.pipe';
import { ColumnResponseDto } from './dto/columnResponse.dto';
import { CreateColumnDto } from './dto/createColumn.dto';
import { UpdateColumnDto } from './dto/updateColumn.dto';
import { ApiBadRequestResponse, ApiOkResponse, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('columns')
@Controller('users/:user_id/columns')
@UseGuards(JwtAuthGuard, OwnerGuard)
export class ColumnsController {
    constructor(private readonly columnsService: ColumnsService) { }

    @Get(':id')
    @ApiOperation({
        description: 'Get a column by it\'s id'
    })
    @ApiResponse({
        status: 200,
        type: ColumnResponseDto
    })
    @ApiResponse({
        status: 404,
        description: 'Column with this id not found'
    })
    async findOne(@Param('id', IdPipe) id: number): Promise<ColumnResponseDto> {
        const column = await this.columnsService.getColumnById(id);
        return new ColumnResponseDto(column);
    }

    @Get()
    @ApiOperation({
        description: 'Get all columns related to the user'
    })
    @ApiResponse({
        status: 200,
        type: ColumnResponseDto,
        isArray: true
    })
    async getAllColumns(@Param('user_id', IdPipe) userId: number): Promise<ColumnResponseDto[]> {
        const columns = await this.columnsService.getColumnsByUser(userId);
        return columns.map(column => new ColumnResponseDto(column));
    }

    @Post()
    @ApiOperation({
        description: 'Create a new column'
    })
    @ApiResponse({
        status: 200,
        type: ColumnResponseDto
    })
    @ApiResponse({
        status: 404,
        description: 'Column with this id not found'
    })
    @ApiBadRequestResponse({
        description: 'Throws detailed validation error message'
    })
    async create(@Req() req, @Body() createColumnDto: CreateColumnDto): Promise<ColumnResponseDto> {
        const column = await this.columnsService.createColumn(req.user.userId, createColumnDto.title);
        return new ColumnResponseDto(column)
    }

    @Put(':id')
    @ApiOperation({
        description: 'Update a column'
    })
    @ApiResponse({
        status: 200,
        type: ColumnResponseDto
    })
    @ApiResponse({
        status: 404,
        description: 'Column with this id not found'
    })
    @ApiBadRequestResponse({
        description: 'Throws detailed validation error message'
    })
    async updateColumn(@Param('id', IdPipe) id: number, @Body() updateColumnDto: UpdateColumnDto): Promise<ColumnResponseDto> {
        const column = await this.columnsService.updateColumn(id, updateColumnDto.title);
        return new ColumnResponseDto(column)
    }

    @Delete(':id')
    @ApiOperation({
        description: 'Deletes column'
    })
    @ApiOkResponse()
    @ApiResponse({
        status: 404,
        description: 'Column with this id not found'
    })
    async deleteColumn(@Param('id', IdPipe) id: number): Promise<void> {
        return this.columnsService.deleteColumn(id);
    }
}