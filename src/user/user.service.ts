import { Injectable } from '@nestjs/common';

import { User } from '@prisma/client';

import { PrismaService } from '@/services';

import { CreateUserDto } from './dto';

@Injectable()
export class UserService {
  constructor(private readonly _prisma: PrismaService) {}

  public async create(dto: CreateUserDto): Promise<User> {
    const user = await this._prisma.user.create({ data: dto });

    return user;
  }

  public async getUserById(id: string): Promise<User> {
    const user = await this._prisma.user.findFirst({ where: { id } });

    return user;
  }

  public async getUserByEmail(email: string): Promise<User> {
    const user = await this._prisma.user.findFirst({ where: { email } });

    return user;
  }
}
