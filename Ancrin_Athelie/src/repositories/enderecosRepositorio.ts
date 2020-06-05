import { verify } from 'jsonwebtoken';
import ConfigToken from '../config/autenticacao';

interface FormatoToken {
  iat: number;
  exp: number;
  sub: string;
}

class EnderecoRepositorio {
  public removerPontuacaoCep(cep: string): string {
    const novoCep = cep.replace('-', '');

    return novoCep;
  }
}

export default EnderecoRepositorio;
