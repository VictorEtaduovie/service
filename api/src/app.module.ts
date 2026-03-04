import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoriesModule } from './categories/categories.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'Jesus Cares',
      database: 'service_platform',
      autoLoadEntities: true,
      synchronize: true,
    }),
    CategoriesModule, // ✅ ONLY here
  ],
})
export class AppModule {}