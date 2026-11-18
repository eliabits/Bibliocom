import {
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Obra } from '../obra/entidades/obra.entity.js';
import { CriarObraDto } from '../obra/dto/criar-obra.dto.js';
import { AtualizarObraDto } from '../obra/dto/atualizar-obra.dto.js';
import { Autor } from '../autor/entidades/autor.entity.js';
import { Categoria } from '../categoria/entidades/categoria.entity.js';
import { CriarAutorDto } from '../autor/dto/criar-autor.dto.js';
import { CriarCategoriaDto } from '../categoria/dto/criar-categoria.dto.js';

@Injectable()
export class AcervoService {
  constructor(
    @InjectRepository(Obra)
    private readonly obraRepository: Repository<Obra>,
     @InjectRepository(Autor)
    private readonly autorRepository: Repository<Autor>,

    @InjectRepository(Categoria)
    private readonly categoriaRepository: Repository<Categoria>,) {}

  async criar(dados: CriarObraDto): Promise<Obra> {
    const obra = this.obraRepository.create(dados);
    return await this.obraRepository.save(obra);
  }

  async listar(): Promise<Obra[]> {
    return await this.obraRepository.find({
      relations: {
        autor: true,
        categorias: true,
      },
      order: {
        id: 'ASC',
      },
    });
  }

  async buscarPorId(id: number): Promise<Obra> {
    const obra = await this.obraRepository.findOne({
      where: { id },
      relations: {
        autor: true,
        categorias: true,
        exemplares: true,
      },
    });

    if (!obra) {
      throw new NotFoundException('Obra não encontrada');
    }

    return obra;
  }

  async atualizar(
    id: number,
    dados: AtualizarObraDto,
  ): Promise<Obra> {
    const obra = await this.buscarPorId(id);

    Object.assign(obra, dados);

    return await this.obraRepository.save(obra);
  }

  async remover(id: number): Promise<void> {
    const obra = await this.buscarPorId(id);

    await this.obraRepository.remove(obra);
  }
  async criarAutor(dados: CriarAutorDto): Promise<Autor> {
  const autor = this.autorRepository.create(dados);
  return await this.autorRepository.save(autor);
}

async listarAutores(): Promise<Autor[]> {
  return await this.autorRepository.find();
}

async criarCategoria(dados: CriarCategoriaDto): Promise<Categoria> {
  const categoria = this.categoriaRepository.create(dados);
  return await this.categoriaRepository.save(categoria);
}

async listarCategorias(): Promise<Categoria[]> {
  return await this.categoriaRepository.find();
}
}
