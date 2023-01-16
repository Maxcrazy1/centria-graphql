import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { RoleService } from './role.service';
import { RoleResolver } from './role.resolver';
import { RoleModel } from './role.model';

@Module({
  imports: [TypeOrmModule.forFeature([RoleModel])],
  providers: [RoleService, RoleResolver],
  exports: [RoleService],
})
export class RoleModule {}
