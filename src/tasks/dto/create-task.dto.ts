import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class CreateTaskDto {
    @ApiProperty({
        description: 'Título da tarefa',
        example: 'Comprar leite'
    })
    @IsString()
    title!: string
}