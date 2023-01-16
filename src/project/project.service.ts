import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ProjectModel } from './project.model';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateProjectDTO } from './project.dto';
import { DeveloperService } from 'src/developer/developer.service';
import { RoleService } from 'src/role/role.service';

@Injectable()
export class ProjectService {
  constructor(
    @InjectRepository(ProjectModel)
    private projectRepository: Repository<ProjectModel>,
    private developerService: DeveloperService,
    private roleService: RoleService,
  ) {}

  async create(details: CreateProjectDTO): Promise<ProjectModel> {
    const developers = await Promise.all(
      details.devs.map(async (dev) => {
        return await this.developerService.findOne(dev.id);
      }),
    );

    const roles = await Promise.all(
      details.roles.map(async (role) => {
        return await this.roleService.findOne(role.id);
      }),
    );

    const areEqualRoles = await Promise.all(
      roles.map((roleProject) => {
        return developers.map((developer) => {
          return developer.roles.map((developerRole) => {
            return developerRole.id == roleProject.id;
          });
        });
      }),
    );

    if (!areEqualRoles.flat(2).includes(true)) {
      throw new HttpException(
        'Los roles del usuario y el proyecto no son compatibles',
        HttpStatus.CONFLICT,
      );
    }

    const project = new ProjectModel();

    project.name = details.name;
    project.description = details.description;
    project.status = details.status;
    project.developers = developers;
    project.roles = roles;

    return this.projectRepository.save(project);
  }

  findAll(status: string, rolesFilter: string[]): Promise<ProjectModel[]> {
    let roles = [];
    if (rolesFilter) {
      roles = rolesFilter.map((role) => {
        return { id: role };
      });
    }

    return this.projectRepository.find({
      relations: { developers: true, roles: true },
      where: {
        status,
        roles,
      },
    });
  }

  async findOne(id: string): Promise<ProjectModel> {
    const devs = await this.projectRepository.findOne({
      where: { id },
      relations: { developers: true, roles: true },
    });

    return devs;
  }
}
