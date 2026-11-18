import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

import type { Relation } from 'typeorm';
import { Obra } from '../../obra/entidades/obra.entity.js';

export enum EstadoExemplar {
  BOM = 'BOM',
  DESGASTADO = 'DESGASTADO',
  DESCARTADO = 'DESCARTADO',
}

@Entity('exemplar')
export class Exemplar {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'enum',
    enum: EstadoExemplar,
    default: EstadoExemplar.BOM,
  })
  estado: EstadoExemplar;

  @Column({ name: 'obraId' })
  obraId: number;

  @ManyToOne(() => Obra, (obra) => obra.exemplares, {
    nullable: false,
  })
  @JoinColumn({ name: 'obraId' })
  obra: Relation<Obra>;
}
