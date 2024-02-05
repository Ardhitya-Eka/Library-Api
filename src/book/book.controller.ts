/* eslint-disable prettier/prettier */
import { Controller, Get } from '@nestjs/common';


@Controller('book')
export class BookController {
    @Get('/hello')
    hello(){
        return'Hello world'
    }
}
