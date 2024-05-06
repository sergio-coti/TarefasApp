import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { AuthHelper } from "../helpers/auth.helper";

@Injectable({
    providedIn: 'root'
})
export class AuthGuard {

    //método construtor
    constructor(
        private router: Router,
        private authHelper: AuthHelper
    ) {}

    /*
        Método para verificar se o usuário está
        autenticado no sistema
    */
   canActivate() {
        //buscando o usuário autenticado no projeto
        const usuario = this.authHelper.getUser();
        //verificando se existe um usuário
        if(usuario != null) {
            return true;
        }
        else {
            //redirecionar para a página de autenticação
            this.router.navigate(['/pages/autenticar-usuario']);
            return false;
        }
   }
}