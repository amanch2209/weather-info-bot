import { Controller, Get, Delete, Param} from '@nestjs/common';
import { UserService } from './user.service'
import { User } from './user.schema'

@Controller('user')
export class UserController {
    constructor(private readonly userService : UserService){}
    @Get()
    async getUsers() : Promise<User[]>{
        return this.userService.getAllUsers();
    } 
    @Delete(':ID')
    async deleteUser(@Param('ID') ID : number){
        const deleteUser = await this.userService.deleteUser(ID);
        if (deleteUser){
            return {message : "User Successfully Deleted"}
        }
        else{
            return {message : "User Not Found"}
        }
    }      
}
