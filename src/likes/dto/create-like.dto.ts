import { IsIn, IsInt, IsOptional } from 'class-validator';

export class CreateLikeDto {
    @IsInt()
    @IsOptional()
    postId?: number;

    @IsInt()
    @IsOptional()
    beerId?: number;
}
