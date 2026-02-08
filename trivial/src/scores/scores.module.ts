import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ScoresService } from './scores.service';
import { ScoresController } from './scores.controller';
import { Score, ScoreSchema } from './entities/score.entity';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Score.name, schema: ScoreSchema }]),
    AuthModule,
  ],
  controllers: [ScoresController],
  providers: [ScoresService],
  exports: [ScoresService], 
})
export class ScoresModule {}