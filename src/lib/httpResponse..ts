import { HttpException, HttpStatus } from '@nestjs/common';

const responseCreateSuccesses = (response) => {
    const { message, data = null } = response;
    return { statusCode: HttpStatus.CREATED, timestamp: new Date().toUTCString(), message, data };
};

const responseCreateFailure = (response) => {
    const { message, data } = response;
    responseHttp(data, message, HttpStatus.INTERNAL_SERVER_ERROR);
};

const responseGetDataSuccesses = (response) => {
    const { message, data } = response;
    return { statusCode: HttpStatus.OK, timestamp: new Date().toUTCString(), message, data };
};

const responseGetDataFailure = (response) => {
    const { message, data } = response;
    responseHttp(data, message, HttpStatus.NOT_FOUND);
};

const responseUpdateSuccesses = (response) => {
    const { message, data } = response;
    return { statusCode: HttpStatus.OK, timestamp: new Date().toUTCString(), message, data };
};

const responseUpdateFailure = (response) => {
    const { message, data } = response;
    responseHttp(data, message, HttpStatus.FORBIDDEN);
};

const responseDeleteSuccesses = (response) => {
    const { message, data } = response;
    return { statusCode: HttpStatus.OK, timestamp: new Date().toUTCString(), message, data };
};

const responseDeleteFailure = (response) => {
    const { message, data } = response;
    responseHttp(data, message, HttpStatus.FORBIDDEN);
};

const responseMissingData = (message = '') => {
    responseHttp(null, message || 'Thiếu dữ liệu vui lòng kiểm tra lại', HttpStatus.BAD_REQUEST);
};

const responseHttp = (data: any, message: string, HttpStatus: number) => {
    throw new HttpException({ statusCode: HttpStatus, timestamp: new Date().toUTCString(), message, data }, HttpStatus);
};

export {
    responseCreateSuccesses,
    responseCreateFailure,
    responseGetDataSuccesses,
    responseGetDataFailure,
    responseDeleteFailure,
    responseDeleteSuccesses,
    responseUpdateFailure,
    responseUpdateSuccesses,
    responseMissingData,
};
