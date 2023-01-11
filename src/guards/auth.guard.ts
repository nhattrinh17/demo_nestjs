import { Injectable, CanActivate, ExecutionContext, ArgumentsHost } from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class AuthGuard implements CanActivate {
    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        const request = context.switchToHttp().getRequest();
        return validateRequest(request);
    }
}

function validateRequest(request: Request): boolean {
    console.log(request);

    return true;
}
