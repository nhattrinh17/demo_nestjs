import { Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(private usersService: UserService, private jwtService: JwtService) {}

    async validateUser(username: string, password: string): Promise<any> {
        console.log('2');

        const user = await this.usersService.findOne(username);

        const isMatch = await bcrypt.compare(password, user.data.password);

        return isMatch ? user.data : null;
    }

    async login(user: any) {
        console.log(user);

        const payload = { username: user.username, sub: user.id };
        return {
            access_token: this.jwtService.sign(payload),
        };
    }
}
