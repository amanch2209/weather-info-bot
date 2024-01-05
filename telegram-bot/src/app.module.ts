import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BotService } from './telegram-bot';
import { DatabaseModule } from './database/database.module';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './user/user.module';
import { AdminModule } from './admin/admin.module';
import { AdminService } from './admin/admin.service';
import { AdminController } from './admin/admin.controller';

@Module({
  imports: [DatabaseModule,MongooseModule.forRootAsync({
    useFactory: ()=>({
      uri : process.env.MONGO_URL,
      useNewUrlParser : true
    })
  }), UserModule, AdminModule],
  controllers: [AppController, AdminController],
  providers: [AppService, BotService, AdminService],
})
export class AppModule {}
