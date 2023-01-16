import { Controller, Post, Get, Patch, Delete, Body, Param, HttpCode, HttpStatus } from '@nestjs/common';
import {
    responseCreateFailure,
    responseCreateSuccesses,
    responseDeleteFailure,
    responseDeleteSuccesses,
    responseGetDataFailure,
    responseGetDataSuccesses,
    responseMissingData,
    responseUpdateFailure,
    responseUpdateSuccesses,
} from 'src/lib/httpResponse.';
import { CreateUserVer2Dto } from './dto/create-user-ver2.dto';
import { UpdateUserVer2Dto } from './dto/update-user-ver2.dto';
import { UserVer2Service } from './user-ver2.service';

@Controller('user-ver2')
export class UserVer2Controller {
    constructor(private readonly userService: UserVer2Service) {}

    @HttpCode(HttpStatus.CREATED)
    @Post('insert')
    async create(@Body() createUserDto: CreateUserVer2Dto) {
        if (
            (createUserDto.name && createUserDto.email && createUserDto.password && createUserDto.phone,
            createUserDto.username)
        ) {
            const response = await this.userService.createUser(createUserDto);
            return response.status ? responseCreateSuccesses(response) : responseCreateFailure(response);
        } else {
            return responseMissingData();
        }
    }

    @HttpCode(HttpStatus.OK)
    @Get('list')
    async findAll() {
        const response = await this.userService.getAllUsers();
        return response.status ? responseGetDataSuccesses(response) : responseGetDataFailure(response);
    }

    @HttpCode(HttpStatus.OK)
    @Get('get/:account')
    async findOne(@Param('account') account: string) {
        if (account) {
            const response = await this.userService.getUserByAccount(account);
            return response.status ? responseGetDataSuccesses(response) : responseGetDataFailure(response);
        }
        return responseMissingData();
    }

    @HttpCode(HttpStatus.OK)
    @Patch('update/:id')
    async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserVer2Dto) {
        if (id && updateUserDto.email && updateUserDto.phone) {
            if (id.match(/^[0-9a-fA-F]{24}$/)) {
                const response = await this.userService.updateUser(id, updateUserDto);
                return response.status ? responseUpdateSuccesses(response) : responseUpdateFailure(response);
            }
            return responseUpdateFailure({ message: 'Id không hợp lệ' });
        }
        return responseMissingData();
    }

    @HttpCode(HttpStatus.OK)
    @Delete('delete/:id')
    async remove(@Param('id') id: string) {
        if (id) {
            if (id.match(/^[0-9a-fA-F]{24}$/)) {
                const response = await this.userService.deleteUser(id);
                return response.status ? responseDeleteSuccesses(response) : responseDeleteFailure(response);
            }
            return responseDeleteFailure({ message: 'Id không hợp lệ' });
        }
        return responseMissingData();
    }
}
