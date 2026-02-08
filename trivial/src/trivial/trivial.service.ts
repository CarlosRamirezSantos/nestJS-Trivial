import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Question } from './entities/question.entity';
import { CreateQuestionDto } from './dto/create-question.dto';
import { AnswerDto } from './dto/answer.dto';
import { ScoresService } from '../scores/scores.service'; 

@Injectable()
export class TrivialService {
  constructor(
    @InjectModel(Question.name) private questionModel: Model<Question>,
    private scoresService: ScoresService 
  ) {}

  async create(createQuestionDto: CreateQuestionDto) {
    return this.questionModel.create(createQuestionDto);
  }

  async getRandomQuestion() {
    const count = await this.questionModel.countDocuments();
    const random = Math.floor(Math.random() * count);
    const question = await this.questionModel.findOne().skip(random).exec();
    
    if (!question) return null;
    
    const { correctAnswer, ...result } = question.toObject();
    return result;
  }

  async answerQuestion(answerDto: AnswerDto, userId: string) {

    const question = await this.questionModel.findById(answerDto.id);
    
    if (!question) {
        throw new NotFoundException('Pregunta no encontrada');
    }

    const isCorrect = Number(question.correctAnswer) === Number(answerDto.option);

    if (isCorrect) {

        await this.scoresService.create({
            score: question.points, 
            user: userId
        }, userId);

        return { 
            result: '¡Correcto!', 
            correct: true, 
            points: question.points 
        };
    } else {
        return { 
            result: 'Incorrecto', 
            correct: false, 
            points: 0 
        };
    }
  }

 
  async getScores() {
      return this.scoresService.getStats();
  }
}