class AppErro {
  public readonly message: string;

  public readonly statusError: number;

  constructor(mensagem: string, status = 400) {
    this.message = mensagem;
    this.statusError = status;
  }
}

export default AppErro;
