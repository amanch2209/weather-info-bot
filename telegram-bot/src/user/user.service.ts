import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './user.schema'

@Injectable()
export class UserService {
    constructor(@InjectModel(User.name) private userModel : Model<User>){}
    async createUser(ID:number,userName:string,apiKey:string) : Promise<User>{
        const user = new this.userModel({ID,userName,apiKey});
        return user.save();
    }
    async deleteUser(ID:number) : Promise<User | null>{
        return this.userModel.findOneAndDelete({ID}).exec();
    }
    async getAllUsers() : Promise<User[]>{
        return this.userModel.find().exec();
    }
    async getUserByID(ID:number) : Promise<User | null>{
        return this.userModel.findOne({ID}).exec();
    }
}
