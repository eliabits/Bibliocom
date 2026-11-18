
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
} from 'typeorm';
import { Obra } from '../../obra/entidades/obra.entity.js';

@Entity('categoria')
export class Categoria {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100, unique: true })
  nome: string;

  @ManyToMany(() => Obra, (obra) => obra.categorias)
  obras: Obra[];
}
