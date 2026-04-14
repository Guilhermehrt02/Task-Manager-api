import { Controller, Get, Post, UseGuards, Body, Patch, Param, Delete } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetUser } from 'src/common/decorators/get-user.decorator';
import { UpdateTaskDto } from './dto/update-task.dto';

@Controller('tasks')
@UseGuards(JwtAuthGuard)
export class TasksController {
    constructor(private tasksService: TasksService) {}

    @Post()
    create(@Body() createTaskDto: CreateTaskDto, @GetUser() user: any) {
        return this.tasksService.create(createTaskDto.title, user.userId);
    }

    @Get()
    findAll(@GetUser() user: any) {
        return this.tasksService.findAll(user.userId);
    }

    @Patch(':id')
    update(
        @Param('id') id: string, 
        @Body() data: UpdateTaskDto, 
        @GetUser() user: any
    ) {
        return this.tasksService.update(id, user.userId, data);
    }

    @Delete(':id')
    delete(@Param('id') id: string, @GetUser() user: any) {
        return this.tasksService.delete(id, user.userId);
    }
}
