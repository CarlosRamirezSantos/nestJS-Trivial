import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from '../users/dto/create-user.dto';
// import * as bcrypt from 'bcrypt'; // Descomentar si usas encriptación

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService
  ) {}

  async validateUser(email: string, pass: string): Promise<any> {

    const user = await this.usersService.findOne({ email: email } as any); 

    if (user && user.password === pass) {
      const { password, ...result } = user.toObject ? user.toObject() : user;
      return result;
    }
    return null;
  }

  async login(user: any) {
    const payload = { 
        email: user.email, 
        sub: user._id,
        roles: user.roles 
    };
    
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async register(createUserDto: CreateUserDto) {

    const newUser = await this.usersService.create(createUserDto);
    
    return this.login(newUser);
  }
}