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
            this.bot.sendMessage(ID, `Use /subscribe for weather bot api`);
        });

        this.bot.onText(/\/subscribe/, async(msg)=>{
            const ID = msg.chat.id;
            const userName = msg.from.first_name;
            const existingUser = await this.userService.getUserByID(ID);
            if(existingUser){
                this.bot.sendMessage(ID, `You have already subscribed to the bot api`);
                this.sendWeatherReport(ID);
            }
            else{
                const user = await this.userService.createUser(ID, userName);
                if(user){
                    this.bot.sendMessage(ID, `You have successfully subscribed to the weather bot api`);
                    this.currentUsers.add(ID);
                    this.bot.sendMessage(ID, `Use command /unsubscribe to unsubscribe the api`);
                    this.sendWeatherReport(ID);
    
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
                    this.bot.sendMessage(ID, `You have unsubscribed to weather bot api`);
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

    async sendWeatherReport(ID:number){
        const apiKey = this.adminService.getAPI();
        this.bot.on('message', async(msg)=>{
            const input = msg.text;
            try{
                const response = await axios.get(
                    `https://api.openweathermap.org/data/2.5/weather?q=${input}&appid=${apiKey}`
                );
                const data = response.data;
                const weather = data.weather[0].description;
                const temperature = Math.round(data.main.temp-273.15);
                const city = data.name;
                const message = `Weather in ${city} is ${weather} with a temperature ${temperature}C`;
                this.bot.sendMessage(ID,message);
            }catch(error){
                console.log(error.message);
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
