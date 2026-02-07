import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TrivialService } from './trivial.service';
import { TrivialController } from './trivial.controller';
import { Question, QuestionSchema } from './entities/question.entity';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Question.name,
        schema: QuestionSchema,
      },
    ]),
  ],
  controllers: [TrivialController],
  providers: [TrivialService],
})
export class TrivialModule {}