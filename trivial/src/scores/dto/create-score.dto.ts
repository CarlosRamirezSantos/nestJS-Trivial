import { IsNumber, IsMongoId } from 'class-validator';

export class CreateScoreDto {
    @IsMongoId()
    user: string;

    @IsNumber()
    score: number;
}