import { IsBoolean, IsOptional, IsString } from "class-validator";

export class UpdateTaskDto {
    @IsString()
    @IsOptional()
    title?: string

    @IsOptional()
    @IsBoolean()
    completed?: boolean
}