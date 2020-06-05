import { getRepository } from 'typeorm';
import ProdutosCarrinhos from '../../models/produtocarrinho';
import AppError from '../../errors/AppError';

export default class ListarProdutosCarrinhos {
  public async execute({
    carrinho_id,
  }: {
    carrinho_id: string;
  }): Promise<ProdutosCarrinhos[]> {
    const model = getRepository(ProdutosCarrinhos);

    const list = await model.find({ where: { carrinho_id } });

    return list;
  }
}
