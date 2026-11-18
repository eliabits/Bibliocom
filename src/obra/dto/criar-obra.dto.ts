import {
  IsString,
  IsInt,
  IsOptional,
  IsNotEmpty,
  IsISBN,
  MaxLength,
  Min,
  Max,
} from 'class-validator';

export class CriarObraDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(200)
  titulo: string;

  @IsInt()
  @Min(1000)
  @Max(2100)
  anoPublicacao: number;

  @IsOptional()
  @IsISBN()
  isbn?: string;

  @IsInt()
  @Min(1)
  autorId: number;
}
