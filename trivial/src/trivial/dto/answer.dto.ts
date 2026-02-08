import { IsInt, IsString, Min } from 'class-validator';

export class AnswerDto {
    @IsString()
    id: string;

    @IsInt()
    @Min(0)
    option: number;
}