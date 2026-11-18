import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AcervoService } from './acervo.service.js';
import { AcervoController } from './acervo.controller.js';

import { Autor } from '../autor/entidades/autor.entity.js';
import { Obra } from '../obra/entidades/obra.entity.js';
import { Categoria } from '../categoria/entidades/categoria.entity.js';
import { Exemplar } from '../exemplar/entidades/exemplar.entity.js';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Autor,
      Obra,
      Categoria,
      Exemplar,
    ]),
  ],
  controllers: [AcervoController],
  providers: [AcervoService],
})
export class AcervoModule {}
