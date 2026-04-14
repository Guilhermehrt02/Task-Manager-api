import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class TasksService {
    constructor(private prisma: PrismaService) {}

    create(title: string, userId: string) {
        return (this.prisma as any).task.create({
            data: {
                title,
                userId
            }
        })
    }

    findAll(userId: string) {
        return (this.prisma as any).task.findMany({
            where: {
                userId
            }
        })
    }

    async update(id: string, userId: string, data: any) {
        const task = await (this.prisma as any).task.findFirst({
            where: {
                id,
                userId
            }
        })

        if (!task) {
            throw new Error('Task not found')
        }

        return (this.prisma as any).task.update({
            where: {
                id
            },
            data
        })
    } 

    async delete(id: string, userId: string) {
        const task = await (this.prisma as any).task.findFirst({
            where: {
                id,
                userId
            }
        })

        if (!task) {
            throw new Error('Task not found')
        }

        return (this.prisma as any).task.delete({
            where: {
                id
            }
        })
    }
}
