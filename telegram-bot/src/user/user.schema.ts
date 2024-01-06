import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

@Schema()
export class User extends Document{
    @Prop({required:true})
    ID : number;

    @Prop({required:true})
    userName : string;

    @Prop({required:true})
    apiKey : string

    @Prop({default:Date.now})
    created : Date;

    @Prop({default:Date.now})
    updated : Date
}

export const userSchema = SchemaFactory.createForClass(User);