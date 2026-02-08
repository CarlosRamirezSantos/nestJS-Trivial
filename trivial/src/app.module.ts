import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { TrivialModule } from './trivial/trivial.module';
import { UsersModule } from './users/users.module';
import { AuthService } from './auth/auth.service';
import { AuthController } from './auth/auth.controller';
import { AuthModule } from './auth/auth.module';
import { ScoresModule } from './scores/scores.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, 
    }),

    MongooseModule.forRoot(
      `mongodb://${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`,
    ),

    TrivialModule,

    UsersModule,

    AuthModule,

    ScoresModule,
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AppModule {}