import { PartialType } from '@nestjs/mapped-types';
import { CriarObraDto } from './criar-obra.dto.js';

export class AtualizarObraDto extends PartialType(CriarObraDto) {}
