import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { AppController } from './app.controller';
import { ConfigModule } from '@nestjs/config';
import { CatsModule } from './cats/cats.module';
import { UserModule } from './user/user.module';
import { LoggerMiddleware } from './middleware/logger.middleware';
import { AuthModule } from './auth/auth.module';
import { PassportModule } from '@nestjs/passport/dist';
import { MongooseModule } from '@nestjs/mongoose';
import { UserVer2Module } from './user-ver2/user-ver2.module';

@Module({
    imports: [
        MongooseModule.forRoot(
            `mongodb+srv://nhattrinh:${process.env.MONGODB_PASSWORD}@cluster0.dqyptzl.mongodb.net/?retryWrites=true&w=majority`,
        ),
        ConfigModule.forRoot(),
        CatsModule,
        UserModule,
        PassportModule,
        AuthModule,
        UserVer2Module,
    ],
    controllers: [AppController],
})
export class AppModule implements NestModule {
    configure(consumer: MiddlewareConsumer) {
        consumer.apply(LoggerMiddleware).forRoutes({ path: 'cats/get', method: RequestMethod.GET });
    }
}
