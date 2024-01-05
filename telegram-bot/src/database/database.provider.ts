import { Provider } from "@nestjs/common";
import * as mongoose from 'mongoose';

export const databaseProvider : Provider[] = [
    {
        provide : 'DATABASE_CONNECTION',
        useFactory : async() : Promise<typeof mongoose> =>{
            try{
                const url = process.env.MONGO_URL;
                const connection = await mongoose.connect(url);
                return connection; 
            }catch(error){
                console.log(error);
            }
        }
    },
];