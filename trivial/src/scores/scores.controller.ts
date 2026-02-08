import { Controller, Get, Post, Body, UseGuards, Request } from '@nestjs/common';
import { ScoresService } from './scores.service';
import { CreateScoreDto } from './dto/create-score.dto';
import { JwtAuthGuard } from '../auth/jwt_strategy/jwt-auth.guard'; 

@Controller('scores')
export class ScoresController {
  constructor(private readonly scoresService: ScoresService) {}


  @Get()
  async findAll() {
    return this.scoresService.getStats();
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  create(@Body() createScoreDto: CreateScoreDto, @Request() req) {
  
    return this.scoresService.create(createScoreDto, req.user.userId);
  }
}