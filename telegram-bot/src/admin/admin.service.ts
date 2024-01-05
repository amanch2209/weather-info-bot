import { Injectable } from '@nestjs/common';
import { config } from 'dotenv';
config();

@Injectable()
export class AdminService {
    private apiKey = process.env.OPEN_WEATHER;
    private users : string[] = [];

    getAPI() : string{
        return this.apiKey;
    }

    setAPI(key:string) : string{
        this.apiKey = key;
        return "API Key Modified";
    } 

    getAllUsers() : string[]{
        return this.users;
    }

}
