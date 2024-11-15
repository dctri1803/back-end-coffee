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
import { CartModules } from './modules/carts/cart.module';
import { ToppingModules } from './modules/toppings/topping.module';
import { SizeModules } from './modules/sizes/size.module';
import { PaymentMethodModule } from './modules/payment-methods/payment-method.module';
import { VoucherModules } from './modules/vourchers/voucher.module';
import { OrderModules } from './modules/orders/order.module';
import { BlogModules } from './modules/blogs/blog.module';

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
    ToppingModules,
    CartModules,
    SizeModules,
    PaymentMethodModule,
    VoucherModules,
    OrderModules,
    BlogModules
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
