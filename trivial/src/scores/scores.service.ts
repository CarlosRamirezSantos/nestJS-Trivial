import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { isValidObjectId, Model, Types } from 'mongoose';
import { Score } from './entities/score.entity';
import { CreateScoreDto } from './dto/create-score.dto';

@Injectable()
export class ScoresService {
  constructor(@InjectModel(Score.name) private scoreModel: Model<Score>) {}


  async create(createScoreDto: CreateScoreDto, userId: string) {

    if (!isValidObjectId(userId)) {
      throw new BadRequestException('ID de usuario inválido');
    }

    const puntosAGuardar = createScoreDto.points || 20;

    return await this.scoreModel.create({

        user: new Types.ObjectId(userId), 
        

        points: puntosAGuardar, 
        
        date: new Date()
    });
  }

  async getStats() {
    return await this.scoreModel.aggregate([
      {
        $group: {

          _id: '$user', 
          

          totalPoints: { $sum: '$points' } 
        }
      },
      { 
        $sort: { totalPoints: -1 } 
      },
      { 
        $limit: 10 
      },
      {
        $lookup: {
          from: 'users',      
          localField: '_id',   
          foreignField: '_id', 
          as: 'userInfo'
        }
      },
      {
        $unwind: {
          path: '$userInfo',
          preserveNullAndEmptyArrays: true 
        }
      },
      {
        $project: {
          _id: 0,

          name: { $ifNull: ['$userInfo.name', 'Anónimo'] },

          totalPoints: 1 
        }
      }
    ]);
  }
}