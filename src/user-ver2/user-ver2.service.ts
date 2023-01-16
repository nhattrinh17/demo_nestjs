import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './user.schema';
import { Model } from 'mongoose';
import { CreateUserVer2Dto } from './dto/create-user-ver2.dto';
import * as bcrypt from 'bcrypt';
import { UserVer2 } from './user-ver2.interface';
import { UpdateUserVer2Dto } from './dto/update-user-ver2.dto';
import { checkEmail } from 'src/util/validateEmail';

@Injectable()
export class UserVer2Service {
    constructor(@InjectModel(User.name) private userModule: Model<UserDocument>) {}

    async createUser(createUserDto: CreateUserVer2Dto): Promise<any> {
        const checkUser = await this.userModule.exists({
            $or: [{ phone: createUserDto.phone }, { email: createUserDto.email }],
        });

        if (checkUser) {
            return { status: false, message: 'Tài khoản đã tồn tại', data: null };
        }

        const saltOrRounds = 10;
        const password = await bcrypt.hash(createUserDto.password, saltOrRounds);
        createUserDto.password = password;
        const newUser = new this.userModule(createUserDto);
        const statusCreate = await newUser.save();
        return statusCreate
            ? { status: true, message: 'Tạo tài khoản thành công', data: null }
            : { status: false, message: 'Tạo tài khoản thất bại', data: null };
    }

    async getUserByAccount(account: string): Promise<any> {
        let user: UserVer2;
        if (checkEmail(account)) {
            user = await this.userModule.findOne({ email: account }).select('name email phone username');
        } else {
            if (!account.match(/^[0-9a-fA-F]{24}$/)) {
                return { status: true, message: 'Id không hợp lệ' };
            }
            user = await this.userModule.findOne({ _id: account }).select('name email phone username');
        }
        if (user) {
            return { status: true, message: 'Lấy dữ liệu thành công', data: user };
        }
        return { status: false, message: 'Không có dữ liệu', data: null };
    }

    async getAllUsers(): Promise<any> {
        const allUser = await this.userModule.find().select('name email phone username');
        if (allUser.length) {
            return { status: true, message: 'Lấy dữ liệu thành công', data: allUser };
        } else {
            return { status: false, message: 'Không có dữ liệu, vui lòng thử lại sau', data: allUser };
        }
    }

    async updateUser(id: string, updateUserDto: UpdateUserVer2Dto): Promise<any> {
        const checkUser = await this.userModule.exists({ _id: id });
        if (!id.match(/^[0-9a-fA-F]{24}$/)) {
            return { status: true, message: 'Id không hợp lệ' };
        }
        if (checkUser) {
            return this.userModule
                .updateOne({ _id: id }, updateUserDto)
                .then(() => Object({ status: true, message: 'Cập nhật tài khoản thành công', data: null }))
                .catch(() => {
                    return { status: false, message: 'Cập nhật tài khoản thất bại, vui lòng thử lại', data: null };
                });
        }
        return { status: false, message: 'Tài khoản không tông tại vui lòng thử lại', data: null };
    }

    async deleteUser(id: string): Promise<any> {
        if (!id.match(/^[0-9a-fA-F]{24}$/)) {
            return { status: true, message: 'Id không hợp lệ' };
        }
        const checkUser = await this.userModule.exists({ _id: id });
        if (checkUser) {
            return this.userModule
                .deleteOne({ _id: id })
                .then(() => Object({ status: true, message: 'Xóa tài khoản thành công', data: null }))
                .catch((error) => Object({ status: false, message: 'Xóa tài khoản thất bại', data: null }));
        }
        return { status: false, message: 'Tài khoản không tông tại vui lòng thử lại', data: null };
    }
}
