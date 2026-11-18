
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
  ManyToMany,
  JoinColumn,
  JoinTable,
} from 'typeorm';

import type { Relation } from 'typeorm';
import { Autor } from '../../autor/entidades/autor.entity.js';
import { Categoria } from '../../categoria/entidades/categoria.entity.js';
import { Exemplar } from '../../exemplar/entidades/exemplar.entity.js';

@Entity('obra')
export class Obra {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 200 })
  titulo: string;

  @Column({ type: 'int' })
  anoPublicacao: number;

  @Column({ type: 'varchar', length: 20, nullable: true, unique: true })
isbn: string | null;

  @Column({ name: 'autorId' })
  autorId: number;

  @ManyToOne(() => Autor, (autor) => autor.obras, {
    nullable: false,
  })
  @JoinColumn({ name: 'autorId' })
  autor: Relation<Autor>;

  @ManyToMany(() => Categoria, (categoria) => categoria.obras)
  @JoinTable({
    name: 'obra_categoria',
    joinColumn: {
      name: 'obraId',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'categoriaId',
      referencedColumnName: 'id',
    },
  })
  categorias: Categoria[];

  @OneToMany(() => Exemplar, (exemplar) => exemplar.obra)
  exemplares: Exemplar[];
}
