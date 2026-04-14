import { Type } from "class-transformer";
import { IsBooleanString, IsInt, IsOptional, Min } from "class-validator";

export class QueryTaskDto {
    @IsOptional()
    @IsBooleanString()
    completed?: string;

    @IsOptional()
    @Type(() => Number)
    @IsInt()
    @Min(1)
    page?: number=1;

    @IsOptional()
    @Type(() => Number)
    @IsInt()
    @Min(1)
    limit?: number=10;
}