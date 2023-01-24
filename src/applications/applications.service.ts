import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateApplicationDto } from './dto/create-application.dto';
import { UpdateApplicationDto } from './dto/update-application.dto';
import { Application } from './entities/application.entity';

@Injectable()
export class ApplicationsService {

  constructor(
    @InjectRepository(Application)
    private applicationsRepository: Repository<Application>,
  ) {}

  async create(createApplicationDto: CreateApplicationDto) {
    const entitydata = Object.assign(new Application(), createApplicationDto);
    return await this.applicationsRepository.save(entitydata);
  }

  findAll() {
    return `This action returns all applications`;
  }

  findOne(id: number) {
    return `This action returns a #${id} application`;
  }

  update(id: number, updateApplicationDto: UpdateApplicationDto) {
    return `This action updates a #${id} application`;
  }

  remove(id: number) {
    return `This action removes a #${id} application`;
  }
}
