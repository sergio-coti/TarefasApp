import { Injectable } from '@angular/core';
import { AutenticarUsuarioResponse } from '../models/usuarios/autenticar-usuario.response';
import { CryptoHelper } from './crypto.helper';

@Injectable({
  providedIn: 'root',
})
export class AuthHelper {

  //método construtor
  constructor(
    private cryptoHelper: CryptoHelper
    ) {}

  /*
        Chave para identificar os dados que serão
        gravados na local storage
    */
  key: string = 'auth-user';

  /*
        Método para salvar as informações do usuário
        autenticado no sistema
    */
  signIn(data: AutenticarUsuarioResponse): void {
    const content = JSON.stringify(data);
    localStorage.setItem(this.key, this.cryptoHelper.encrypt(content));
  }

  /*
        Método para retornar os dados do usuário
        autenticado no sistema
   */
  getUser(): AutenticarUsuarioResponse | null {

    //ler os dados gravados na local storage
    const data = localStorage.getItem(this.key);  

    //verificar se o valor lido não é vazio
    if(data != null) {

      //descriptografar o valor lido
      const usuario = this.cryptoHelper.decrypt(data);

      //verificar se o token não expirou
      const dataHoraAtual = new Date();
      const dataHoraExpiracao = new Date(JSON.parse(usuario).dataHoraExpiracao);
      if(dataHoraAtual <= dataHoraExpiracao) {
            //retornar os dados do usuário
            return JSON.parse(usuario);
      }      
    }

    return null;
  }

  /*
        Método para apagar as informações
        do usuário autenticado
  */
  signOut(): void {
    //limpar as informações salvas na local storage
    localStorage.removeItem(this.key);
  }
}
