import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { Op } from 'sequelize';
import Users from 'src/models/user';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './user.interface';

@Injectable()
export class UserService {
    async create(createUserDto: CreateUserDto): Promise<any> {
        const checkUser = await Users.findOne({
            where: {
                [Op.or]: [
                    { email: createUserDto.email },
                    { username: createUserDto.username },
                    { phone: createUserDto.phone },
                ],
            },
        });

        if (checkUser) {
            return { status: false, message: 'Tài khoản đã tồn tại', data: null };
        }
        const saltOrRounds = 10;
        const password = await bcrypt.hash(createUserDto.password, saltOrRounds);
        createUserDto.password = password;
        const statusCreate = await Users.create(createUserDto);
        if (statusCreate) {
            return { status: true, message: 'Tạo tài khoản thành công', data: null };
        }
        return { status: false, message: 'Tạo tài khoản thất bại', data: null };
    }

    async findAll(): Promise<any> {
        const attributes = ['id', 'username', 'email', 'phone'];
        const allUser = await Users.findAll({ attributes });
        if (allUser.length) {
            return { status: true, message: 'Lấy dữ liệu thành công', data: allUser };
        }
        return { status: false, message: 'Không có dữ liệu, vui lòng thử lại sau', data: allUser };
    }

    async findOne(account: number | string): Promise<any> {
        const attributes = ['id', 'username', 'email', 'phone', 'password'];
        let user: User;
        if (typeof account === 'number') {
            user = await Users.findOne({ attributes, where: { id: account } });
        } else {
            user = await Users.findOne({ attributes, where: { username: account } });
        }
        if (user) {
            return { status: true, message: 'Lấy dữ liệu thành công', data: user };
        }
        return { status: false, message: 'Không có dữ liệu', data: null };
    }

    async update(id: number, updateUserDto: UpdateUserDto): Promise<any> {
        const attributes = ['id'];
        const user = await Users.findOne({ attributes, where: { id } });
        if (user) {
            const statusUpdate = await Users.update(updateUserDto, { where: { id: id } });
            if (statusUpdate) {
                return { status: true, message: 'Cập nhật tài khoản thành công', data: null };
            }
            return { status: false, message: 'Cập nhật tài khoản thất bại', data: null };
        }
        return { status: false, message: 'Tài khoản không tông tại vui lòng thử lại', data: null };
    }

    async updatePassword(id: number, updateUserDto: UpdateUserDto): Promise<any> {
        const attributes = ['id'];
        const user = await Users.findOne({ attributes, where: { id } });
        if (user) {
            const saltOrRounds = 10;
            const password = await bcrypt.hash(updateUserDto.password, saltOrRounds);
            updateUserDto.password = password;
            const statusCreate = await Users.update(updateUserDto, { where: { id: id } });
            if (statusCreate) {
                return { status: true, message: 'Cập nhật mật khẩu thành công', data: null };
            }
            return { status: false, message: 'Cập nhật mật khẩu thất bại', data: null };
        }
        return { status: false, message: 'Tài khoản không tông tại vui lòng thử lại', data: null };
    }

    async remove(id: number): Promise<any> {
        const attributes = ['id', 'deleted_at'];
        const user = await Users.findOne({ attributes, where: { id } });
        if (user && !user.deleted_at) {
            const statusRemove = await Users.delete({ where: { id: id } });
            if (statusRemove) {
                return { status: true, message: 'Xóa tài khoản thành công', data: null };
            }
            return { status: false, message: 'Xóa tài khoản thất bại', data: null };
        }
        return { status: false, message: 'Tài khoản không tông tại vui lòng thử lại', data: null };
    }
}
