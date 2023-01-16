import { Field, InputType } from '@nestjs/graphql';
import { IsEmail, IsNotEmpty } from 'class-validator';

@InputType()
class roleDTO {
  @Field()
  id: string;
}

@InputType()
export class DeveloperDTO {
  @Field()
  @IsNotEmpty()
  name: string;

  @Field()
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @Field((type) => [roleDTO])
  roles: Array<{ id: string }>;
}
