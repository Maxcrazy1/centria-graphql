import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { ObjectType, Field } from '@nestjs/graphql';
import { ProjectModel } from 'src/project/project.model';
import { DeveloperModel } from 'src/developer/developer.model';

@ObjectType()
@Entity()
export class RoleModel {
  @Field()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field()
  @Column({ length: 500, nullable: false })
  name: string;

  @ManyToOne(() => DeveloperModel, (developer) => developer.roles)
  @Field(() => [DeveloperModel], { nullable: true })
  developers: DeveloperModel[];

  @ManyToOne(() => ProjectModel, (project) => project.roles)
  @Field(() => [ProjectModel], { nullable: true })
  projects: ProjectModel[];

  @Field()
  @Column()
  @CreateDateColumn()
  createdAt: Date;

  @Field()
  @Column()
  @UpdateDateColumn()
  updatedAt: Date;
}
