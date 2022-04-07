import { Module } from '@nestjs/common';
import { ApolloDriver } from '@nestjs/apollo';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from '../database/database.module';

import path from 'node:path';
import { GraphQLModule } from '@nestjs/graphql';
import { ProductsResolver } from './graphql/resolvers/products.resolver';
import { ProductsService } from '../services/products.service';
import { PurchasesResolver } from './graphql/resolvers/purchases.resolver';
import { PurchasesService } from '../services/purchases.service';

@Module({
  imports: [
    ConfigModule.forRoot(),
    DatabaseModule,
    GraphQLModule.forRoot({
      driver: ApolloDriver,
      autoSchemaFile: path.resolve(process.cwd(), 'src/schema.gql'),
    }),
  ],
  providers: [
    // Resolvers
    ProductsResolver,
    PurchasesResolver,

    // Services
    ProductsService,
    PurchasesService,
  ],
})
export class HttpModule {}
