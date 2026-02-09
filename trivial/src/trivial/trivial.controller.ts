import { Controller, Get, Post, Body, UseGuards, Request, UsePipes, ValidationPipe, Delete, Patch, Param } from '@nestjs/common';
import { TrivialService } from './trivial.service';
import { CreateQuestionDto } from './dto/create-question.dto';
import { AnswerDto } from './dto/answer.dto';
import { JwtAuthGuard } from '../auth/jwt_strategy/jwt-auth.guard'; 
import { Roles } from '../auth/roles/roles.decorator';
import { RolesGuard } from '../auth/roles/roles.guard';
import { UpdateQuestionDto } from './dto/update-question.dto';

@Controller('trivial')
@UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true, transform: true }))
export class TrivialController {
  constructor(private readonly trivialService: TrivialService) {}

 @Post()
  @UseGuards(JwtAuthGuard, RolesGuard) 
  @Roles('admin')
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

    return this.trivialService.answerQuestion(answerDto, req.user.id);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  remove(@Param('id') id: string) {
    return this.trivialService.remove(id);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  update(@Param('id') id: string, @Body() updateQuestionDto: UpdateQuestionDto) {
    return this.trivialService.update(id, updateQuestionDto);
  }

  @Get('all')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  findAll() {
  return this.trivialService.findAll();
}
}