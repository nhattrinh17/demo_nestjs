import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './user.schema';
import { UserVer2Controller } from './user-ver2.controller';
import { UserVer2Service } from './user-ver2.service';

@Module({
    imports: [MongooseModule.forFeature([{ name: User.name, schema: UserSchema }])],
    controllers: [UserVer2Controller],
    providers: [UserVer2Service],
})
export class UserVer2Module {}
