import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ collection: 'questions' })
export class Question extends Document {
    @Prop({ unique: true, index: true, required: true })
    id: number;

    @Prop({ required: true })
    question: string;

    @Prop({ type: [String], required: true })
    options: string[];

    @Prop({ required: true })
    correctAnswer: number;

    @Prop({ default: 20 }) 
    points: number;
}

export const QuestionSchema = SchemaFactory.createForClass(Question);
QuestionSchema.set('versionKey', false);