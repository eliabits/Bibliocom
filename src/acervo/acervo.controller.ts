import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  ParseIntPipe,
} from '@nestjs/common';

import { CriarAutorDto } from '../autor/dto/criar-autor.dto.js';
import { CriarCategoriaDto } from '../categoria/dto/criar-categoria.dto.js';
import { AcervoService } from './acervo.service.js';
import { CriarObraDto } from '../obra/dto/criar-obra.dto.js';
import { AtualizarObraDto } from '../obra/dto/atualizar-obra.dto.js';

@Controller('obras')
export class AcervoController {
  constructor(
    private readonly acervoService: AcervoService,
  ) {}
  @Post('autores')
criarAutor(@Body() dados: CriarAutorDto) {
  return this.acervoService.criarAutor(dados);
}

@Get('autores')
listarAutores() {
  return this.acervoService.listarAutores();
}

@Post('categorias')
criarCategoria(@Body() dados: CriarCategoriaDto) {
  return this.acervoService.criarCategoria(dados);
}

@Get('categorias')
listarCategorias() {
  return this.acervoService.listarCategorias();
}

  @Post()
  criar(@Body() dados: CriarObraDto) {
    return this.acervoService.criar(dados);
  }

  @Get()
  listar() {
    return this.acervoService.listar();
  }

  @Get(':id')
  buscarPorId(@Param('id', ParseIntPipe) id: number) {
    return this.acervoService.buscarPorId(id);
  }

  @Put(':id')
  atualizar(
    @Param('id', ParseIntPipe) id: number,
    @Body() dados: AtualizarObraDto,
  ) {
    return this.acervoService.atualizar(id, dados);
  }

  @Delete(':id')
  remover(@Param('id', ParseIntPipe) id: number) {
    return this.acervoService.remover(id);
  }
}
