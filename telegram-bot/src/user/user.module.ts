import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { User, userSchema } from './user.schema'

@Module({
  imports : [MongooseModule.forFeature([{name:User.name, schema:userSchema}])],
  providers: [UserService],
  controllers: [UserController],
  exports : [UserService]
})
export class UserModule {}
