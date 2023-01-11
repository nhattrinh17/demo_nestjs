import { PipeTransform, Injectable, HttpException, HttpStatus } from '@nestjs/common';

@Injectable()
export class ParseDataToIntPipe implements PipeTransform {
    message: string;

    constructor(message = '') {
        this.message = message;
    }
    transform(value: any): number {
        const transformedValue = parseInt(value, 10);
        if (isNaN(transformedValue)) {
            throw new HttpException(
                this.message || 'Không thể chuyển đổi sang định dạng số nguyên',
                HttpStatus.BAD_REQUEST,
            );
        }
        return transformedValue;
    }
}
