import { InputType, Field } from '@nestjs/graphql';
import { IsNotEmpty } from 'class-validator';

@InputType()
class ObjectDTO {
  @Field()
  id: string;
}

@InputType()
export class CreateProjectDTO {
  @Field()
  @IsNotEmpty()
  name: string;

  @Field()
  description: string;

  @Field()
  status: string;

  @Field((type) => [ObjectDTO])
  devs: Array<{ id: string }>;

  @Field((type) => [ObjectDTO])
  roles: Array<{ id: string }>;
}
