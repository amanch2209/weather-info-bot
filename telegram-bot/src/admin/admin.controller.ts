import { Controller, Get, Post, Body } from '@nestjs/common';
import { AdminService } from './admin.service'

@Controller('admin')
export class AdminController {
    constructor(private readonly adminService : AdminService){}

    @Get('apiKey')
    getAPIKey(){
        return this.adminService.getAPI
    }

    @Post('apiKey')
    setAPIKey(@Body() apiKey: {key:string}){
        return this.adminService.setAPI(apiKey.key);
    }

    @Get('users')
    getUsers(){
        return this.adminService.getAllUsers();
    }

}
