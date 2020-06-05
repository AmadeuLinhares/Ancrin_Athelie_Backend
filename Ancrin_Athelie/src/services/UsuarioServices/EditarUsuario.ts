import { getRepository } from 'typeorm';
import path from 'path';
import fs from 'fs';
import Usuarios from '../../models/usuarios';
import ConfigUploadImg from '../../config/upload';

interface EdicaoUsuario {
  nome: string;
  email: string;
  cpf: string;
  foto: string;
  user_id: string;
}

export default class EditarUsuario {
  public async execute({
    nome,
    email,
    foto,
    cpf,
    user_id,
  }: EdicaoUsuario): Promise<Usuarios> {
    const usuarios = getRepository(Usuarios);

    const user = await usuarios.findOne({
      where: { id: user_id },
    });

    if (!user) {
      throw new Error('Usuario não existe na aplicação');
    }

    if (user.foto) {
      const fotoUsuarioCaminhoImg = path.join(
        ConfigUploadImg.diretorio,
        user.foto,
      );

      const fotoExiste = await fs.promises.stat(fotoUsuarioCaminhoImg);

      if (fotoExiste) {
        await fs.promises.unlink(fotoUsuarioCaminhoImg);
      }
    }

    user.foto = foto;
    user.cpf = cpf;
    user.email = email;
    user.nome = nome;

    await usuarios.save(user);

    return user;
  }
}
