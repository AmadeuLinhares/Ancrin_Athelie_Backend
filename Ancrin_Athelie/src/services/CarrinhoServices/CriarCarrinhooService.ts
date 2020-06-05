// NO SERVICE ELE PODE TER APEENAS UM UNICO METODO QUE É O EXECUTE(),
// QUE SERA REALMENTE PARA EXECUTAR O SERVIÇO DE CRIAÇÃO DO USUARIO
// AS VALIDAÇÕES, O QUE TIVER DE FUNCAO PARA VALIDAR ESSA CRIAÇÃOO DEVE
// FICAR NO REPOSITORIES, CONTUDO SE ESSES METODOS NAO EXISTIREM POR PADRAO NO BANCO
// DE DAODS, SE EXISTIREM, DEIXA AQUO MESMO A VALIDACAO

import { getRepository } from 'typeorm';
import Carrinhos from '../../models/carrinhos';
import AppError from '../../errors/AppError';
import Usuario from '../../models/usuarios';

interface Parameters {
  usuario_id: string;
}

class CriarCarrinhoservices {
  public async execute({ usuario_id }: Parameters): Promise<Carrinhos> {
    const CarrinhosRepositorio = getRepository(Carrinhos);
    const UsuariosRepositorio = getRepository(Usuario);

    const verificaCarrinhoExistente = await CarrinhosRepositorio.findOne({
      where: { usuario_id },
    });

    if (verificaCarrinhoExistente) {
      await CarrinhosRepositorio.delete({ usuario_id });
    }

    const verificaUsuarioExistente = await UsuariosRepositorio.findOne({
      where: { id: usuario_id },
    });

    if (!verificaUsuarioExistente) {
      throw new AppError('Usuario não encontrado', 401);
    }

    const CarrinhoCriado = CarrinhosRepositorio.create({
      usuario_id,
    });

    await CarrinhosRepositorio.save(CarrinhoCriado);

    return CarrinhoCriado;
  }
}

export default CriarCarrinhoservices;

// id	categoria_id	nome	descricao	preco	foto	disponibilidade	subtitulo	data_criacao	data_atualizacao
