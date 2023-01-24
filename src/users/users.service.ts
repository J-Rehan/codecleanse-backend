import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { codes } from 'src/common/exceptions/codes';
import { messages } from 'src/common/exceptions/messages';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}
  async create(createUserData: CreateUserDto): Promise<User> {
    const entitydata = Object.assign(new User(), createUserData);
    let userExists = await this.usersRepository.findOneBy({
      email: createUserData.email,
    });
    if (userExists) {
      throw {
        code: codes.CONFLICT,
        message: messages.USER_ALREADY_EXIST,
      };
    }
   
    return await this.usersRepository.save(entitydata);
    
  }

  findAll() {
    return `This action returns all users`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
