import { Controller, Get, Post, Body, Req, Res, HttpStatus, UseInterceptors, UseGuards } from '@nestjs/common';
import { CatsService } from './cats.service';
import { Cat } from './interfaces/cat.interface';
import { Request, Response } from 'express';
import { LoggingInterceptor } from './logging.interceptor';
import { RolesGuard } from './roles.guard';

@Controller('cats')
@UseGuards(RolesGuard)
@UseInterceptors(LoggingInterceptor)
export class CatsController {
    constructor(private catsService: CatsService) {}

    //   @Post()
    //   async create(@Body() createCatDto: CreateCatDto) {
    //     this.catsService.create(createCatDto);
    //   }

    @Get('/get')
    async findAll(@Req() request: Request, @Res() res: Response) {
        const check = request.query.check;
        if (check) {
            res.status(HttpStatus.OK).json(this.catsService.findAll());
        } else {
            res.status(HttpStatus.OK).json('Khong co gi');
        }
    }
}
