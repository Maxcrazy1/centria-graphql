import { Resolver, Query } from '@nestjs/graphql';
import { QueryResult } from 'typeorm';

@Resolver()
export class AppService {
  @Query(() => String)
  getHello(): string {
    return 'Hello World!';
  }
}
