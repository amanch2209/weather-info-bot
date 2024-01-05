import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import {databaseProvider} from './database.provider';

@Module({
    imports : [MongooseModule.forRoot(process.env.MONGO_URL)],
    providers : [...databaseProvider],
    exports : [MongooseModule]
})
export class DatabaseModule { 
}
