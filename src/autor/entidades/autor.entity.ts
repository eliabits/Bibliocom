import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
} from 'typeorm';

import { Obra } from '../../obra/entidades/obra.entity.js';;

@Entity('autor')
export class Autor {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 150 })
  nome: string;

  @Column({ length: 100, nullable: true })
  nacionalidade: string;

  @OneToMany(() => Obra, (obra) => obra.autor)
  obras: Obra[];
}
