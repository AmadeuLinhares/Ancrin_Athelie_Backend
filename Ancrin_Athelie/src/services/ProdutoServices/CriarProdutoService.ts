// NO SERVICE ELE PODE TER APEENAS UM UNICO METODO QUE É O EXECUTE(),
// QUE SERA REALMENTE PARA EXECUTAR O SERVIÇO DE CRIAÇÃO DO USUARIO
// AS VALIDAÇÕES, O QUE TIVER DE FUNCAO PARA VALIDAR ESSA CRIAÇÃOO DEVE
// FICAR NO REPOSITORIES, CONTUDO SE ESSES METODOS NAO EXISTIREM POR PADRAO NO BANCO
// DE DAODS, SE EXISTIREM, DEIXA AQUO MESMO A VALIDACAO

import { getRepository } from 'typeorm';
import Produtos from '../../models/produtos';
import AppError from '../../errors/AppError';

interface Parameters {
  nome: string;
  descricao: string;
  preco: number;
  foto: string;
  disponibilidade: boolean;
  subtitulo: string;
  categoria_id: string;
}

class CriarProdutoservices {
  public async execute({
    nome,
    descricao,
    preco,
    foto,
    disponibilidade,
    subtitulo,
    categoria_id,
  }: Parameters): Promise<Produtos> {
    const ProdutosRepositorio = getRepository(Produtos);

    const verificaNome = await ProdutosRepositorio.findOne({
      where: { nome },
    });

    if (verificaNome) {
      throw new AppError('Produtos já cadastada');
    }

    const ProdutoCriado = ProdutosRepositorio.create({
      nome,
      descricao,
      preco,
      foto,
      disponibilidade,
      subtitulo,
      categoria_id,
    });

    await ProdutosRepositorio.save(ProdutoCriado);

    return ProdutoCriado;
  }
}

export default CriarProdutoservices;

// id	categoria_id	nome	descricao	preco	foto	disponibilidade	subtitulo	data_criacao	data_atualizacao
