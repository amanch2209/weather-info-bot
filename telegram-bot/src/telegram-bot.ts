import { Injectable } from '@nestjs/common';
import * as telegramBot from 'node-telegram-bot-api';
import axios from 'axios';
import { config } from 'dotenv';
config();

const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_TOKEN;
const OPEN_WEATHER_API = process.env.OPEN_WEATHER;

@Injectable()
export class BotService{
    constructor(){
        const bot = new telegramBot(TELEGRAM_BOT_TOKEN , {polling:true});
        bot.onText(/\/start/, (msg)=>{
            const ID = msg.chat.id;
            const name = msg.from.first_name;
            bot.sendMessage(ID,`Hi ${name}, Welcome to the Weather Info Bot`);
            bot.sendMessage(ID, `Please type the City Name for weather updates`);
        })
        bot.on('message', async(msg)=>{
            const input = msg.text;
            const ID = msg.chat.id;
            try{
                const response = await axios.get(
                    `https://api.openweathermap.org/data/2.5/weather?q=${input}&appid=${OPEN_WEATHER_API}`,
                )
                const data = response.data;
                const weather = data.weather[0].describe;
                const message = `${weather}`;
                bot.sendMessage(ID,message);
            }catch(error){
                bot.sendMessage(ID, `${error}`);
            }
        })
    }
}
