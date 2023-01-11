import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { responseDeleteSuccesses, responseMissingData } from 'src/lib/httpResponse.';
import { ParseDataToIntPipe } from 'src/lib/customPipes';
// import { RolesGuard } from 'src/guards/roles.guard';
import {
    responseCreateFailure,
    responseCreateSuccesses,
    responseGetDataSuccesses,
    responseGetDataFailure,
    responseUpdateFailure,
    responseUpdateSuccesses,
    responseDeleteFailure,
} from 'src/lib/httpResponse.';

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Post('insert')
    async create(@Body() createUserDto: CreateUserDto) {
        if ((createUserDto.email && createUserDto.password && createUserDto.phone, createUserDto.username)) {
            const response = await this.userService.create(createUserDto);
            return response.status ? responseCreateSuccesses(response) : responseCreateFailure(response);
        } else {
            return responseMissingData();
        }
    }

    @Get('list')
    async findAll() {
        const response = await this.userService.findAll();
        return response.status ? responseGetDataSuccesses(response) : responseGetDataFailure(response);
    }

    @Get('get/:id')
    async findOne(@Param('id', new ParseDataToIntPipe('Id không hợp lệ')) id: number) {
        if (id) {
            const response = await this.userService.findOne(+id);
            return response.status ? responseGetDataSuccesses(response) : responseGetDataFailure(response);
        }
        return responseMissingData();
    }

    @Patch('update/:id')
    async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
        if (id && updateUserDto.email && updateUserDto.phone) {
            const response = await this.userService.update(+id, updateUserDto);
            return response.status ? responseUpdateSuccesses(response) : responseUpdateFailure(response);
        }
        return responseMissingData();
    }

    @Patch('updatepass/:id')
    async updatePassword(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
        if (id && updateUserDto.password) {
            const response = await this.userService.updatePassword(+id, updateUserDto);
            return response.status ? responseUpdateSuccesses(response) : responseUpdateFailure(response);
        }
        return responseMissingData();
    }

    @Delete('delete/:id')
    async remove(@Param('id') id: string) {
        if (id) {
            const response = await this.userService.remove(+id);
            response.status ? responseDeleteSuccesses(response) : responseDeleteFailure(response);
        }
        return responseMissingData();
    }
}
