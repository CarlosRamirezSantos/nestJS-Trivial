import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Question } from './entities/question.entity';
import { CreateQuestionDto } from './dto/create-question.dto';
import { AnswerDto } from './dto/answer.dto';

@Injectable()
export class TrivialService {
  private score: number = 0;

  constructor(
    @InjectModel(Question.name) private readonly questionModel: Model<Question>,
  ) {}

  async create(createQuestionDto: CreateQuestionDto) {
    try {
        const newQuestion = await this.questionModel.create(createQuestionDto);
        return newQuestion;
    } catch (error) {
        if (error.code === 11000) {
            throw new BadRequestException('El id de la pregunta ya existe');
        }
        throw new InternalServerErrorException('Error al crear la pregunta');
    }
  }

  async getRandomQuestion() {
    try {
        const count = await this.questionModel.countDocuments();
        
        if (count === 0) {
            return { message: "No hay preguntas. Usa POST /trivial para crear una." };
        }

        const random = Math.floor(Math.random() * count);
        const question = await this.questionModel.findOne().skip(random).exec();

        if (!question) {
            throw new InternalServerErrorException('No se pudo recuperar la pregunta');
        }

        return {
            id: question.id,
            question: question.question,
            options: question.options,
        };
    } catch (error) {
        if (error instanceof InternalServerErrorException) {
            throw error;
        }
        throw new InternalServerErrorException('Error al buscar preguntas');
    }
  }

  async answerQuestion(answerDto: AnswerDto) {
    const question = await this.questionModel.findOne({ id: answerDto.id });

    if (!question) {
      throw new NotFoundException(`Pregunta con ID ${answerDto.id} no encontrada`);
    }

    const isCorrect = question.correctAnswer === answerDto.option;

    if (isCorrect) {
      this.score++;
      return { result: '¡Correcto!', currentScore: this.score };
    } else {
      return { result: 'Incorrecto', currentScore: this.score };
    }
  }

  getScore() {
    return { score: this.score };
  }
}