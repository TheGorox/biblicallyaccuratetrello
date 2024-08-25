import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './models/user.model';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class UsersService {
    constructor(
        @InjectModel(User)
        private userModel: typeof User
    ) { }

    async create(email: string, password: string, nickname: string): Promise<User> {
        const passHashed = await bcrypt.hash(password, 10);
        const user = new User({
            email,
            password: passHashed,
            nickname
        });
        return user.save();
    }

    async findUserByEmail(email: string): Promise<User | null> {
        return this.userModel.findOne({
            where: {
                email
            }
        })
    }

    async findUserById(id: number): Promise<User | null> {
        return this.userModel.findByPk(id)
    }

    async deleteUser(id: number): Promise<void> {
        const user = await this.findUserById(id);
        if (!user) {
            throw new NotFoundException('User not found');
        }
        await user.destroy();
    }

    async updateUser(id: number, email?: string, password?: string, username?: string): Promise<User> {
        const user = await this.findUserById(id);
        if (!user) {
            throw new NotFoundException('User not found');
        }

        if (email) {
            user.email = email;
        }

        if (password) {
            user.password = await bcrypt.hash(password, 10);
        }

        if (username) {
            user.nickname = username;
        }

        await user.save();
        return user;
    }
}
