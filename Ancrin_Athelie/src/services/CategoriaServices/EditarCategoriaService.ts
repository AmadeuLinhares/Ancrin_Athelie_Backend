import { getRepository } from 'typeorm';
import path from 'path';
import fs from 'fs';
import Categorias from '../../models/categorias';
import ConfigUploadImg from '../../config/upload';
import AppError from '../../errors/AppError';

interface Parameters {
  nome: string;
  descricao: string;
  id: string;
}

export default class EditarCategoria {
  public async execute({ nome, descricao, id }: Parameters): Promise<object> {
    const model = getRepository(Categorias);

    const elementoEncontrado = await model.findOne({
      where: { id },
    });

    if (!elementoEncontrado) {
      throw new AppError('Categoria não encontrada', 401);
    }

    elementoEncontrado.nome = nome;
    elementoEncontrado.descricao = descricao;

    model.save(elementoEncontrado);

    return {
      message: 'Categoria editada com sucesso',
      categoria: elementoEncontrado,
    };
  }
}
