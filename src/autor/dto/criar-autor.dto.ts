
import {
  IsString,
  IsNotEmpty,
  IsOptional,
  MaxLength,
} from 'class-validator';

export class CriarAutorDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(150)
  nome: string;

  @IsOptional()
  @IsString()
  @MaxLength(100)
  nacionalidade?: string;
}
