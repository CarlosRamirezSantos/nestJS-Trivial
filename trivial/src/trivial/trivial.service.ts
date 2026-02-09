import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Question } from './entities/question.entity';
import { CreateQuestionDto } from './dto/create-question.dto';
import { AnswerDto } from './dto/answer.dto';
import { ScoresService } from '../scores/scores.service'; 
import { UpdateQuestionDto } from './dto/update-question.dto';

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
  if (count === 0) return null;

  const random = Math.floor(Math.random() * count);
  
  const question = await this.questionModel
    .findOne()
    .skip(random)
    .select('-correctAnswer') // Esto evita que el usuario vea la solución en la respuesta HTTP
    .exec();
    
  return question;
}
  async answerQuestion(answerDto: AnswerDto, userId: string) {

    const question = await this.questionModel.findById(answerDto.id);
    
    if (!question) {
        throw new NotFoundException('Pregunta no encontrada en la base de datos');
    }

    const isCorrect = Number(question.correctAnswer) === Number(answerDto.option);

    if (isCorrect) {

        await this.scoresService.create({
            points: question.points, 
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
  async remove(id: string) {
    const result = await this.questionModel.findByIdAndDelete(id).exec();
    if (!result) {
      throw new NotFoundException(`Pregunta con ID ${id} no encontrada`);
    }
    return { deleted: true };
  }

  async update(id: string, updateQuestionDto: UpdateQuestionDto) {
    const updatedQuestion = await this.questionModel
      .findByIdAndUpdate(id, updateQuestionDto, { new: true })
      .exec();
    
    if (!updatedQuestion) {
      throw new NotFoundException(`Pregunta con ID ${id} no encontrada`);
    }
    return updatedQuestion;
  }

  async findAll() {
  return await this.questionModel.find().exec();
}

  async removeAll() {
    return this.questionModel.deleteMany({});
  }

  async getScores() {
      return this.scoresService.getStats();
  }
}