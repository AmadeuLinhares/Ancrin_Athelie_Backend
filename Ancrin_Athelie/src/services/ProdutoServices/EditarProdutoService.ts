import { getRepository } from 'typeorm';
import path from 'path';
import fs from 'fs';
import Produtos from '../../models/produtos';
import ConfigUploadImg from '../../config/upload';
import AppError from '../../errors/AppError';

interface Parameters {
  nome: string;
  descricao: string;
  preco: number;
  foto: string;
  disponibilidade: boolean;
  subtitulo: string;
  categoria_id: string;
  id: string;
}

export default class EditarProduto {
  public async execute({
    nome,
    descricao,
    preco,
    foto,
    disponibilidade,
    subtitulo,
    categoria_id,
    id,
  }: Parameters): Promise<object> {
    const model = getRepository(Produtos);

    const elementoEncontrado = await model.findOne({
      where: { id },
    });

    if (!elementoEncontrado) {
      throw new AppError('Produto não encontrado');
    }

    elementoEncontrado.nome = nome;
    elementoEncontrado.descricao = descricao;
    elementoEncontrado.categoria_id = categoria_id;
    elementoEncontrado.preco = preco;
    elementoEncontrado.foto = foto;
    elementoEncontrado.disponibilidade = disponibilidade;
    elementoEncontrado.subtitulo = subtitulo;

    await model.save(elementoEncontrado);

    return {
      message: 'Produto editado com sucesso',
      categoria: elementoEncontrado,
    };
  }
}
