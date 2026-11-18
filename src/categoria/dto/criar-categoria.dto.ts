
import {
  IsString,
  IsNotEmpty,
  MaxLength,
} from 'class-validator';

export class CriarCategoriaDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  nome: string;
}
