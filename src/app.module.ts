import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AcervoModule } from './acervo/acervo.module.js';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'eliabits',
      password: 'eliabs122024',
      database: 'bibliocom',
      autoLoadEntities: true,
      synchronize: false,
      logging: true,
    }),
    AcervoModule,
  ],
})
export class AppModule {}
