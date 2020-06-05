// NO SERVICE ELE PODE TER APEENAS UM UNICO METODO QUE É O EXECUTE(),
// QUE SERA REALMENTE PARA EXECUTAR O SERVIÇO DE CRIAÇÃO DO USUARIO
// AS VALIDAÇÕES, O QUE TIVER DE FUNCAO PARA VALIDAR ESSA CRIAÇÃOO DEVE
// FICAR NO REPOSITORIES, CONTUDO SE ESSES METODOS NAO EXISTIREM POR PADRAO NO BANCO
// DE DAODS, SE EXISTIREM, DEIXA AQUO MESMO A VALIDACAO

import { getRepository } from 'typeorm';
import { hash } from 'bcryptjs';
import Usuarios from '../../models/usuarios';
import AppError from '../../errors/AppError';

interface DadosUsuario {
  nome: string;
  email: string;
  cpf: string;
  senha: string;
  foto?: string;
}

class CriarUsuarioServices {
  public async execute({
    nome,
    email,
    cpf,
    senha,
    foto,
  }: DadosUsuario): Promise<Usuarios> {
    const usuariosRepositorio = getRepository(Usuarios);

    const verificaEmail = await usuariosRepositorio.findOne({
      where: { email },
    });

    if (verificaEmail) {
      throw new AppError('E-mail já cadastado');
    }

    const verificaCpf = await usuariosRepositorio.findOne({
      where: { cpf },
    });

    if (verificaCpf) {
      throw new AppError('CPF já cadastrado');
    }

    const senhaCriptografada = await hash(senha, 8);

    const usuario = usuariosRepositorio.create({
      nome,
      email,
      cpf,
      senha: senhaCriptografada,
      foto,
    });

    await usuariosRepositorio.save(usuario);

    return usuario;
  }
}

export default CriarUsuarioServices;
