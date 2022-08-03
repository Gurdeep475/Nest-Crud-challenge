/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { ProductsModule } from './products/products.module';
@Module({
  imports: [ProductsModule],
})
export class AppModule {}
