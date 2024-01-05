import { Injectable } from '@nestjs/common';
import * as telegramBot from 'node-telegram-bot-api';
import axios from 'axios';
import { config } from 'dotenv';
config();
import { AdminService } from './admin/admin.service';
import { UserService } from './user/user.service';

const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_TOKEN;

@Injectable()
export class BotService{
    private bot : telegramBot;
    private currentUsers : Set<number> = new Set<number>();
    constructor(private readonly userService : UserService, private readonly adminService : AdminService){
        this.bot = new telegramBot(TELEGRAM_BOT_TOKEN , {polling:true});
        this.getCurrentUsers();
        this.botCommands();
    }
    async botCommands(){

        this.bot.onText(/\/start/, async(msg)=>{
            const ID = msg.chat.id;
            const name = msg.from.first_name;
            this.bot.sendMessage(ID, `Welcome ${name} to the weather info bot`);
            this.bot.sendMessage(ID, `Use /subscribe command to get weather updates of any city`);
        });

        this.bot.onText(/\/subscribe/, async(msg)=>{
            const ID = msg.chat.id;
            const userName = msg.from.first_name;
            const existingUser = await this.userService.getUserByID(ID);
            if(existingUser){
                this.bot.sendMessage(ID, `You have already subscribed to the bot`);
            }
            else{
                const user = await this.userService.createUser(ID, userName);
                if(user){
                    this.bot.sendMessage(ID, `You have successfully subscribed to the weather bot`);
                    this.currentUsers.add(ID);
                    this.bot.sendMessage(ID, `Use command /unsubscribe to stop receiving weather updates`);
                    this.bot.on('message',async(msg)=>{
                        const ID = msg.chat.id;
                        const input = msg.text;
                        const apiKey = this.adminService.getAPI();
                        try{
                            const response = await axios.get(
                                `https://api.openweathermap.org/data/2.5/weather?q=${input}&appid=${apiKey}`
                            )
                            const data = response.data;
                            const weather = data.weather[0].description;
                            const temperature = Math.round(data.main.temp - 273.15);
                            const city = data.name;
                            const message = `Weather in ${city} is ${weather} with temperature as ${temperature}C`;
                            this.bot.sendMessage(ID, message);
                        }catch(error){
                            console.log(error.message);
                        }
                    })
                }
                else{
                    this.bot.sendMessage(ID, `There is some issue...try again later`);
                }
            }            
        });

        this.bot.onText(/\/unsubscribe/, async(msg)=>{
            const ID = msg.chat.id;
            const existingUser = await this.userService.getUserByID(ID);
            if(existingUser){
                const deleteUser = await this.userService.deleteUser(ID);
                if(deleteUser){
                    this.currentUsers.delete(ID);
                    this.bot.sendMessage(ID, `You have unsubscribed to weather bot`);
                    this.bot.on('message',async(msg)=>{
                        const ID = msg.chat.id;
                        this.bot.sendMessage(ID, `Please subscribe to the bot first`);
                    })
                }
                else{
                    this.bot.sendMessage(ID, `There is some issue...try again later`);
                }
            }
            else{
                this.bot.sendMessage(ID, `You havent subscribed to the weather bot`);
            }
        });

    }



    async getCurrentUsers(){
        const users = await this.userService.getAllUsers();
        users.forEach((user)=>{
            this.currentUsers.add(user.ID);
        });
    }
}
