import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateRoleDTO } from './role.dto';
import { RoleModel } from './role.model';

@Injectable()
export class RoleService {
  constructor(
    @InjectRepository(RoleModel)
    private roleRepository: Repository<RoleModel>,
  ) {}

  async create(role: CreateRoleDTO): Promise<RoleModel> {
    return this.roleRepository.save(role);
  }

  findAll(): Promise<RoleModel[]> {
    return this.roleRepository.find();
  }

  findByName(name: string): Promise<RoleModel> {
    return this.roleRepository.findOneBy({ name });
  }

  findOne(id: string): Promise<RoleModel> {
    return this.roleRepository.findOneBy({ id });
  }
}
