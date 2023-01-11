import { Injectable, NestMiddleware, Query } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
// import { Request } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
    use(req: Request, res: Response, next: Function) {
        console.log(req.query);

        console.log('Request... middleware');
        next();
    }
}
