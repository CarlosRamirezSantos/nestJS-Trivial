import { IsString, IsInt, IsArray, IsNumber } from 'class-validator';

export class CreateQuestionDto {
    @IsInt()
    id: number;

    @IsString()
    question: string;

    @IsArray()
    @IsString({ each: true }) 
    options: string[];

    @IsNumber()
    correctAnswer: number;
}