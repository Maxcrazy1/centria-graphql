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
import { DeveloperModel } from '../developer/developer.model';
import { RoleModel } from 'src/role/role.model';

@ObjectType()
@Entity()
export class ProjectModel {
  @Field()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field()
  @Column()
  name: string;

  @Field()
  @Column('text', { nullable: false })
  description: string;

  @Field()
  @Column('varchar', { length: 15 })
  status: string;

  @ManyToMany(() => DeveloperModel)
  @Field(() => [DeveloperModel], { nullable: true })
  @JoinTable()
  developers: DeveloperModel[];

  @OneToMany(() => RoleModel, (role) => role.projects)
  @Field(() => [RoleModel], { nullable: true })
  roles: RoleModel[];

  @Field()
  @Column()
  @CreateDateColumn()
  created_at: Date;

  @Field()
  @Column()
  @UpdateDateColumn()
  updated_at: Date;
}
