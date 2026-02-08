import { IsString, IsInt, IsArray, IsNumber, IsOptional } from 'class-validator';

export class CreateQuestionDto {

    @IsString()
    question: string;

    @IsArray()
    @IsString({ each: true }) 
    options: string[];

    @IsNumber()
    correctAnswer: number;

    @IsNumber()
    @IsOptional()
    points?: number;
}