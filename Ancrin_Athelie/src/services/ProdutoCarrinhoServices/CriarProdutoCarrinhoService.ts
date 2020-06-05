// NO SERVICE ELE PODE TER APEENAS UM UNICO METODO QUE É O EXECUTE(),
// QUE SERA REALMENTE PARA EXECUTAR O SERVIÇO DE CRIAÇÃO DO USUARIO
// AS VALIDAÇÕES, O QUE TIVER DE FUNCAO PARA VALIDAR ESSA CRIAÇÃOO DEVE
// FICAR NO REPOSITORIES, CONTUDO SE ESSES METODOS NAO EXISTIREM POR PADRAO NO BANCO
// DE DAODS, SE EXISTIREM, DEIXA AQUO MESMO A VALIDACAO

import { getRepository } from 'typeorm';
import ProdutosCarrinhos from '../../models/produtocarrinho';
import Carrinhos from '../../models/carrinhos';
import AppError from '../../errors/AppError';

interface Parameters {
  produto_id: string;
  carrinho_id: string;
}

class CriarProdutosCarrinhoservices {
  public async execute({
    produto_id,
    carrinho_id,
  }: Parameters): Promise<ProdutosCarrinhos> {
    const ProdutosCarrinhosRepositorio = getRepository(ProdutosCarrinhos);
    const CarrinhosRepositorio = getRepository(Carrinhos);

    const verificaCarrinhoExistente = await CarrinhosRepositorio.findOne({
      where: { id: carrinho_id },
    });

    if (!verificaCarrinhoExistente) {
      throw new Error('Nenhum carrinho encontrado');
    }

    const ProdutoCarrinhoCriado = ProdutosCarrinhosRepositorio.create({
      produto_id,
      carrinho_id,
    });

    const produtoSalvo = await ProdutosCarrinhosRepositorio.save(
      ProdutoCarrinhoCriado,
    );

    return ProdutoCarrinhoCriado;
  }
}

export default CriarProdutosCarrinhoservices;

// id	categoria_id	nome	descricao	preco	foto	disponibilidade	subtitulo	data_criacao	data_atualizacao
