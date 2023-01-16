import { DeveloperService } from './developer.service';
import { Resolver, Query, Args, Mutation } from '@nestjs/graphql';
import { Inject } from '@nestjs/common';
import { DeveloperModel } from './developer.model';
import { DeveloperDTO } from './developer.dto';

@Resolver((of) => DeveloperModel)
export class DeveloperResolver {
  constructor(
    @Inject(DeveloperService) private developerService: DeveloperService,
  ) {}
  @Query((returns) => DeveloperModel)
  async developer(@Args('id') id: string): Promise<DeveloperModel> {
    return await this.developerService.findOne(id);
  }

  @Query((returns) => [DeveloperModel])
  async developers(
    @Args({ name: 'projects', type: () => [String], nullable: true })
    projects: string[],
    @Args({ name: 'roles', type: () => [String], nullable: true })
    roles: string[],
  ): Promise<DeveloperModel[]> {
    return await this.developerService.findAll(roles, projects);
  }

  @Mutation((returns) => DeveloperModel)
  async createDeveloper(
    @Args('developer') developer: DeveloperDTO,
  ): Promise<DeveloperModel> {
    return await this.developerService.create(developer);
  }
}
