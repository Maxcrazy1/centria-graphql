import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RoleService } from 'src/role/role.service';
import { Repository } from 'typeorm';
import { DeveloperDTO } from './developer.dto';
import { DeveloperModel } from './developer.model';

@Injectable()
export class DeveloperService {
  constructor(
    @InjectRepository(DeveloperModel)
    private developerRepository: Repository<DeveloperModel>,
    private roleService: RoleService,
  ) {}

  async create(developerBody: DeveloperDTO): Promise<DeveloperModel> {
    const roles = await Promise.all(
      developerBody.roles.map(async (role) => {
        return await this.roleService.findOne(role.id);
      }),
    );

    const developer = new DeveloperModel();

    developer.name = developerBody.name;
    developer.email = developerBody.email;
    developer.roles = roles;

    return this.developerRepository.save(developer);
  }

  findAll(
    rolesFilter: string[],
    projectsFilter: string[],
  ): Promise<DeveloperModel[]> {
    let projects = [];
    if (projectsFilter) {
      projects = projectsFilter.map((project) => {
        return { id: project };
      });
    }

    let roles = [];
    if (rolesFilter) {
      roles = rolesFilter.map((project) => {
        return { id: project };
      });
    }

    return this.developerRepository.find({
      where: {
        projects,
        roles,
      },
      relations: {
        projects: true,
        roles: true,
      },
    });
  }

  findOne(id: string): Promise<DeveloperModel> {
    return this.developerRepository.findOne({
      where: { id },
      relations: { roles: true, projects: true },
    });
  }
}
