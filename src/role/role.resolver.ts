import { RoleService } from './role.service';
import { Resolver, Query, Args, Mutation } from '@nestjs/graphql';
import { Inject, UsePipes } from '@nestjs/common';
import { RoleModel } from './role.model';
import NestjsGraphqlValidator from 'nestjs-graphql-validator';

@Resolver((of) => RoleModel)
export class RoleResolver {
  constructor(@Inject(RoleService) private roleService: RoleService) {}
  @Query((returns) => RoleModel)
  async role(@Args('id') id: string): Promise<RoleModel> {
    return await this.roleService.findOne(id);
  }

  @Query((returns) => [RoleModel])
  async roles(): Promise<RoleModel[]> {
    return await this.roleService.findAll();
  }

  @Mutation((returns) => RoleModel)
  @UsePipes(
    new NestjsGraphqlValidator({
      name: { minLen: 1, maxLen: 150 },
    }),
  )
  async createRole(@Args('name') name: string): Promise<RoleModel> {
    const roleExists = await this.roleService.findByName(name);

    if (!roleExists) {
      return await this.roleService.create({ name });
    }

    return roleExists;
  }
}
