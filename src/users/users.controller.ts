import { Body, Controller, Delete, Get, MethodNotAllowedException, Param, Post, Put, UseGuards } from '@nestjs/common';
import { ApiBadRequestResponse, ApiCreatedResponse, ApiMethodNotAllowedResponse, ApiOkResponse, ApiOperation, ApiResponse, ApiTags, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/createUser.dto';
import { UpdateUserDto } from './dto/updateUser.dto';
import { UserResponseDto } from './dto/userResponse.dto';
import { JwtAuthGuard } from '../auth/jwtAuth.guard';
import { IdPipe } from '../pipe/id.pipe';

@ApiTags('users')
@Controller('users')
@UseGuards(JwtAuthGuard)
@ApiUnauthorizedResponse({
    description: 'Invalid or none JWT token present'
})
export class UsersController {
    constructor(private readonly usersService: UsersService) { }

    @Post()
    @ApiOperation({
        description: 'Create a user'
    })
    @ApiCreatedResponse({
        description: 'User has been created successfully',
        type: UserResponseDto
    })
    @ApiBadRequestResponse({
        description: 'Throws detailed validation error message'
    })
    async createUser(@Body() createUserDto: CreateUserDto): Promise<UserResponseDto> {
        const user = await this.usersService.create(
            createUserDto.email,
            createUserDto.password,
            createUserDto.username
        );
        return new UserResponseDto(user);
    }

    @Get()
    @ApiOperation({
        description: 'Not implemented method. do not use'
    })
    @ApiMethodNotAllowedResponse({
        description: 'Throw this error until some better way to get users is implemented'
    })
    // неразумно давать пользователю всех юзеров в бд по запросу. 
    // а для фильтрации или поиска всегда можно сделать другой эндпоинт
    async getAllUsers() {
        throw new MethodNotAllowedException();
    }

    @Get(':id')
    @ApiOperation({
        description: 'Get a user by id'
    })
    @ApiResponse({
        status: 200,
        type: UserResponseDto
    })
    @ApiResponse({
        status: 404,
        description: 'User with this id not found'
    })
    async getUser(@Param('id', IdPipe) id: number): Promise<UserResponseDto> {
        const user = await this.usersService.findUserById(id)
        return new UserResponseDto(user);
    }

    @Put(':id')
    @ApiOperation({
        description: 'Update a user'
    })
    @ApiResponse({
        status: 200,
        type: UserResponseDto
    })
    @ApiResponse({
        status: 404,
        description: 'User with this id not found'
    })
    @ApiBadRequestResponse({
        description: 'Throws detailed validation error message'
    })
    async updateUser(@Param('id', IdPipe) id: number, @Body() updateUserDto: UpdateUserDto): Promise<UserResponseDto> {
        const user = await this.usersService.updateUser(
            id,
            updateUserDto.email, updateUserDto.password, updateUserDto.username
        )
        return new UserResponseDto(user);
    }

    @Delete(':id')
    @ApiOperation({
        description: 'Delete a user'
    })
    @ApiOkResponse()
    @ApiResponse({
        status: 404,
        description: 'User with this id not found'
    })
    async deleteUser(@Param('id', IdPipe) id: number): Promise<void> {
        return this.usersService.deleteUser(id);
    }
}