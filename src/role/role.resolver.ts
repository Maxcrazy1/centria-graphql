import { RoleService } from './role.service';
import { Resolver, Query, Args, Mutation } from '@nestjs/graphql';
import { Inject, UsePipes } from '@nestjs/common';
import { RoleModel } from './role.model';
import { CreateRoleDTO } from './role.dto';

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
  async createRole(@Args('role') roleDto: CreateRoleDTO): Promise<RoleModel> {
    const roleExists = await this.roleService.findByName(roleDto.name);

    if (!roleExists) {
      return await this.roleService.create(roleDto);
    }

    return roleExists;
  }
}
