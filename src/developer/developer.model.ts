import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToMany,
  JoinTable,
  OneToMany,
} from 'typeorm';
import { ObjectType, Field } from '@nestjs/graphql';
import { ProjectModel } from 'src/project/project.model';
import { RoleModel } from 'src/role/role.model';

@ObjectType()
@Entity()
export class DeveloperModel {
  @Field()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field()
  @Column({ length: 500, nullable: false })
  name: string;

  @Field()
  @Column('text', { nullable: false })
  email: string;

  @ManyToMany(() => ProjectModel)
  @Field(() => [ProjectModel], { nullable: true })
  @JoinTable()
  projects: ProjectModel[];

  @OneToMany(() => RoleModel, (role) => role.developers)
  @Field(() => [RoleModel], { nullable: true })
  roles: RoleModel[];

  @Field()
  @Column()
  @CreateDateColumn()
  createdAt: Date;

  @Field()
  @Column()
  @UpdateDateColumn()
  updatedAt: Date;
}
