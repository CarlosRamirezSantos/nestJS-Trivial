import { Controller, Get, Post, Body, UseGuards, Request, UsePipes, ValidationPipe } from '@nestjs/common';
import { TrivialService } from './trivial.service';
import { CreateQuestionDto } from './dto/create-question.dto';
import { AnswerDto } from './dto/answer.dto';
import { JwtAuthGuard } from '../auth/jwt_strategy/jwt-auth.guard'; // Asegura que la ruta es correcta

@Controller('trivial')
// Mantenemos tus pipes de validación
@UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: false, transform: true }))
export class TrivialController {
  constructor(private readonly trivialService: TrivialService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  create(@Body() createQuestionDto: CreateQuestionDto) {
    return this.trivialService.create(createQuestionDto);
  }

  @Get('random')
  @UseGuards(JwtAuthGuard)
  getRandom() {
    return this.trivialService.getRandomQuestion();
  }

  @Post('answer')
  @UseGuards(JwtAuthGuard) 
  answer(@Body() answerDto: AnswerDto, @Request() req) {
   
    return this.trivialService.answerQuestion(answerDto, req.user.userId);
  }
}