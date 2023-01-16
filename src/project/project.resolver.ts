import { Resolver, Mutation, Args, Query } from '@nestjs/graphql';

import { Inject } from '@nestjs/common';
import { ProjectService } from './project.service';
import { ProjectModel } from './project.model';
import { CreateProjectDTO } from './project.dto';

@Resolver((of) => ProjectModel)
export class ProjectResolver {
  constructor(@Inject(ProjectService) private projectService: ProjectService) {}
  @Query((returns) => ProjectModel)
  async project(@Args('id') id: string): Promise<ProjectModel> {
    return await this.projectService.findOne(id);
  }

  // @ResolveField((returns) => [InvoiceModel])
  // async invoices(@Parent() customer) {
  //   const { id } = customer;
  //   console.log(customer);
  //   return this.invoiceService.findByCustomer(id);
  // }

  @Query((returns) => [ProjectModel])
  async projects(
    @Args('status', { nullable: true }) status: string,
    @Args({ name: 'roles', type: () => [String], nullable: true })
    roles: string[],
  ): Promise<ProjectModel[]> {
    return await this.projectService.findAll(status, roles);
  }

  @Mutation((returns) => ProjectModel)
  async createProject(
    @Args('project') project: CreateProjectDTO,
  ): Promise<ProjectModel> {
    return await this.projectService.create(project);
  }
}
