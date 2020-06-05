import { getRepository } from 'typeorm';
import Usuarios from '../../models/usuarios';

export default class ListarUsuarios {
  public async execute(): Promise<Usuarios[]> {
    const usuarios = getRepository(Usuarios);

    const listaUsuarios = await usuarios.find();

    return listaUsuarios;
  }
}
