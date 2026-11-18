import 'reflect-metadata';
import { DataSource } from 'typeorm';

import { Autor } from './autor/entidades/autor.entity.js';
import { Obra } from './obra/entidades/obra.entity.js';
import { Categoria } from './categoria/entidades/categoria.entity.js';
import { Exemplar } from './exemplar/entidades/exemplar.entity.js';

export default new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'eliabits',
  password: 'eliabs122024',
  database: 'bibliocom',

  entities: [
    Autor,
    Obra,
    Categoria,
    Exemplar,
  ],

  migrations: ['src/migrations/*.ts'],

  synchronize: false,
  logging: true,
});
