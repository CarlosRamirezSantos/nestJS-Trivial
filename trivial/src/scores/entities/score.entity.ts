import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { User } from '../../users/entities/user.entity';

@Schema()
export class Score extends Document {
  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  user: User; 

  @Prop({ required: true })
  score: number;

  @Prop({ default: Date.now })
  date: Date;
}

export const ScoreSchema = SchemaFactory.createForClass(Score);