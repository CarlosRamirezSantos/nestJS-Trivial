import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TrivialService } from './trivial.service';
import { TrivialController } from './trivial.controller';
import { Question, QuestionSchema } from './entities/question.entity';
import { ScoresModule } from 'src/scores/scores.module';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Question.name,
        schema: QuestionSchema,
      },
    ]),
    ScoresModule,
    AuthModule,
  ],
  controllers: [TrivialController],
  providers: [TrivialService],
})
export class TrivialModule {}