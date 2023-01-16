import { TypeOrmModule } from '@nestjs/typeorm';
import { forwardRef, Module } from '@nestjs/common';
import { DeveloperService } from './developer.service';
import { DeveloperResolver } from './developer.resolver';
import { DeveloperModel } from './developer.model';
import { RoleModule } from 'src/role/role.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([DeveloperModel]),
    forwardRef(() => RoleModule),
  ],
  providers: [DeveloperService, DeveloperResolver],
  exports: [DeveloperService],
})
export class DeveloperModule {}
