import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsOptional, IsString } from "class-validator";

export class UpdateTaskDto {
    @ApiProperty({
        description: 'Título da tarefa',
        example: 'Comprar leite',
        required: false
    })
    @IsString()
    @IsOptional()
    title?: string

    @ApiProperty({
        description: 'Status da tarefa',
        example: false,
        required: false
    })
    @IsOptional()
    @IsBoolean()
    completed?: boolean
}