import { getRepository } from 'typeorm';
import ProdutosCarrinho from '../../models/produtocarrinho';
import AppError from '../../errors/AppError';

interface Parameters {
  produto_id: string;
}
export default class DeleteProdutosCarrinhos {
  public async execute({ produto_id }: Parameters): Promise<object> {
    const model = getRepository(ProdutosCarrinho);

    const deletedElemento = await model.findOne({ produto_id });

    if (!deletedElemento) {
      throw new AppError('Produto não encontrado no carrinho');
    }

    await model.delete({ id: deletedElemento.id });

    return {
      message: 'Carrinho deletado com suceeso',
      carrinho: deletedElemento,
    };
  }
}
