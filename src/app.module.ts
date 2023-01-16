import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DeveloperModel } from './developer/developer.model';
import { DeveloperModule } from './developer/developer.module';
import { RoleModule } from './role/role.module';
import { RoleModel } from './role/role.model';
import { ProjectModule } from './project/project.module';
import { ProjectModel } from './project/project.model';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: 'schema.gql',
    }),

    DeveloperModule,
    RoleModule,
    ProjectModule,
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: '../centria_db.sqlite',
      entities: [DeveloperModel, RoleModel, ProjectModel],
      synchronize: true,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
