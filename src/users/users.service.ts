import { ConflictException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
    constructor(private prisma: PrismaService) {}

    async create(data: CreateUserDto) {
        const { name, email, password } = data;

        const userExists = await this.prisma.user.findUnique({
            where: { email },
        });

        if (userExists) {
            throw new ConflictException('User already exists');
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await this.prisma.user.create({
            data: {
                name,
                email,
                password: hashedPassword,
            },
        });

        const { password: _, ...userWithoutPassword } = user;

        return userWithoutPassword;
    }

    async findAll() {
        const users = await this.prisma.user.findMany();

        return users.map(({ password, ...user }) => user);
    }

    async findByEmail({ email }: { email: string }) {
        return this.prisma.user.findUnique({
            where: { email },
        });
    }
}
