import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

 async create(createUserDto: CreateUserDto) {
  const exists = await this.userModel.findOne({ email: createUserDto.email });
  if (exists) {
      throw new BadRequestException('El email ya existe');
  }

  const { password, ...restoDeDatos } = createUserDto; 
  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = await this.userModel.create({
    ...restoDeDatos,
    password: hashedPassword,
  });

  return newUser;
}

  async findAll() {
    return this.userModel.find().exec();
  }

  async findOne(id: string) {
    const user = await this.userModel.findById(id);
    if (!user) throw new NotFoundException('User not found');
    return user;
  }

  async findEmail(email: string) {
    const user = await this.userModel.findOne({ email });
    if (!user) {
      throw new NotFoundException(`User with email ${email} not found`);
    }
    return user;
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const updatedUser = await this.userModel.findByIdAndUpdate(id, updateUserDto, { new: true });
    if (!updatedUser) throw new NotFoundException('User not found');
    return updatedUser;
  }

  async remove(id: string) {
    const deletedUser = await this.userModel.findByIdAndDelete(id);
    if (!deletedUser) throw new NotFoundException('User not found');
    return deletedUser;
  }
}