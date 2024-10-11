import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DatabaseConfig } from 'ormconfig';
import { ServeStaticModule } from '@nestjs/serve-static';
import { UserModules } from './modules/users/user.module';
import { CurrentUserMiddleware } from './modules/users/middlewares/current-user.middleware';
import { ProductModules } from './modules/products/product.module';
import { join } from 'path';
import { FranchisesModule } from './modules/franchises/franchise.module';
import { CategoryModules } from './modules/categories/category.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      ...DatabaseConfig,
      autoLoadEntities:true,
      logging: true,
    }),
    ServeStaticModule.forRoot({
      rootPath: join(process.cwd(), 'public'),
    }),
    UserModules,
    ProductModules,
    FranchisesModule,
    CategoryModules,
    // CartModules,
    // OrderModules
    
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule{
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(CurrentUserMiddleware)
      .forRoutes('*');
  }
}
