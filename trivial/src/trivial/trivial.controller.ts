import { Controller, Get, Post, Body, UsePipes, ValidationPipe } from '@nestjs/common';
import { TrivialService } from './trivial.service';
import { CreateQuestionDto } from './dto/create-question.dto';
import { AnswerDto } from './dto/answer.dto';

@Controller('trivial')
@UsePipes(new ValidationPipe({ 
    whitelist: true,
    forbidNonWhitelisted: true,
    transform: true
}))
export class TrivialController {
  constructor(private readonly trivialService: TrivialService) {}

  @Post()
  create(@Body() createQuestionDto: CreateQuestionDto) {
    return this.trivialService.create(createQuestionDto);
  }

  @Get('random')
  getRandom() {
    return this.trivialService.getRandomQuestion();
  }

  @Post('answer')
  answer(@Body() answerDto: AnswerDto) {
    return this.trivialService.answerQuestion(answerDto);
  }

  @Get('score')
  getScore() {
    return this.trivialService.getScore();
  }
}