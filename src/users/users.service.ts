import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { PrismaService } from '../prisma/prisma.service.js';
import { CreateUserDto } from './dto/create-user.dto.js';
import { UpdateUserDto } from './dto/update-user.dto.js';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createUserDto: CreateUserDto) {
    const existing = await this.prisma.user.findUnique({
      where: { email: createUserDto.email },
    });
    if(existing) {
      throw new ConflictException('이미 존재하는 이메일입니다.');
    }

    const passwordHash = await bcrypt.hash(createUserDto.password, 10);

    const user = await this.prisma.user.create({
      data: {
        email: createUserDto.email,
        passwordHash,
        nickname: createUserDto.nickname,
      },
    });

    return this.excludePassword(user);
  }

  async findAll() {
    const users = await this.prisma.user.findMany();
    return users.map((u) => this.excludePassword(u));
  }

  async findOne(id: number) {
    const user = await this.prisma.user.findUnique({ where: { id } });
    if (!user) {
      throw new NotFoundException(`User #${id} not found`);
    }
    return this.excludePassword(user);
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    await this.findOne(id);

    const data: any = { ...updateUserDto };
    if(updateUserDto.password) {
      data.passwordHash = await bcrypt.hash(updateUserDto.password, 10);
      delete data.password;
    }

    const user = await this.prisma.user.update({ where: { id }, data });
    return this.excludePassword(user);
  }

  async remove(id: number) {
    await this.findOne(id);
    await this.prisma.user.delete({ where: { id } });
    return { message: `User #${id} deleted` };
  }

  private excludePassword(user: { passwordHash: string; [key: string]: any }) {
    const { passwordHash, ...rest } = user;
    return rest;
  }

}
