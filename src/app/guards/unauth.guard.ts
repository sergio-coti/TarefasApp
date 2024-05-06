import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { AuthHelper } from "../helpers/auth.helper";

@Injectable({
    providedIn: 'root'
})
export class UnAuthGuard {

    constructor(
        private router: Router,
        private authHelper: AuthHelper
    ) {}

    /*
        O angular deverá liberar o acesso a rota
        caso não exista um usuário autenticado
    */
   canActivate() {
    const usuario = this.authHelper.getUser();
    if(usuario == null) {
        return true;
    }
    else {
        this.router.navigate(['/admin/dashboard']);
        return false;
    }
   }

}