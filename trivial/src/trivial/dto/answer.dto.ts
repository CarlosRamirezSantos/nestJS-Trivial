import { IsInt, Min } from 'class-validator';

export class AnswerDto {
    @IsInt()
    id: number;

    @IsInt()
    @Min(0)
    option: number;
}