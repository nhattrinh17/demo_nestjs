import { Injectable, NestMiddleware, Query } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
// import { Request } from 'express';

@Injectable()
class LoggerMiddleware implements NestMiddleware {
    use(req: Request, res: Response, next: Function) {
        console.log(req.query);

        console.log('Request... middleware');
        next();
    }
}

function loggerFunction(req: Request, res: Response, next: NextFunction) {
    console.log(`Request... middleware...function`);
    next();
}

export { LoggerMiddleware, loggerFunction };
