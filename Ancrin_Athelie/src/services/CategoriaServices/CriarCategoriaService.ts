// NO SERVICE ELE PODE TER APEENAS UM UNICO METODO QUE É O EXECUTE(),
// QUE SERA REALMENTE PARA EXECUTAR O SERVIÇO DE CRIAÇÃO DO USUARIO
// AS VALIDAÇÕES, O QUE TIVER DE FUNCAO PARA VALIDAR ESSA CRIAÇÃOO DEVE
// FICAR NO REPOSITORIES, CONTUDO SE ESSES METODOS NAO EXISTIREM POR PADRAO NO BANCO
// DE DAODS, SE EXISTIREM, DEIXA AQUO MESMO A VALIDACAO

import { getRepository } from 'typeorm';
import Categoria from '../../models/categorias';
import AppError from '../../errors/AppError';

interface Parameters {
  nome: string;
  descricao: string;
}

class CriarCategoriaServices {
  public async execute({ nome, descricao }: Parameters): Promise<Categoria> {
    const CategoriaRepositorio = getRepository(Categoria);

    const verificaNome = await CategoriaRepositorio.findOne({
      where: { nome },
    });

    if (verificaNome) {
      throw new AppError('Categoria já cadastada', 401);
    }

    const categoriaCriada = CategoriaRepositorio.create({
      nome,
      descricao,
    });

    await CategoriaRepositorio.save(categoriaCriada);

    return categoriaCriada;
  }
}

export default CriarCategoriaServices;
