import { InputType, Field } from '@nestjs/graphql';
import { IsNotEmpty } from 'class-validator';

@InputType()
export class CreateRoleDTO {
  @Field()
  @IsNotEmpty()
  name: string;
}
