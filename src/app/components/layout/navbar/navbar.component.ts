import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthHelper } from '../../../helpers/auth.helper';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    RouterLink,
    CommonModule
  ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit {

  //atributos
  isAuthenticated: boolean = false;
  nomeUsuario: string = '';
  emailUsuario: string = '';

  //método construtor
  constructor(
    private authHelper: AuthHelper,
    private router: Router
  ){}

  //método executado no momento do carregamento
  //do componente (quando o componente for aberto)
  ngOnInit(): void {
    //capturar as informações do usuário autenticado
    const usuario = this.authHelper.getUser();
    //verificar se há um usuário autenticado
    if(usuario != null) {
      this.isAuthenticated = true;
      this.nomeUsuario = usuario.nome;
      this.emailUsuario = usuario.email;
    }
  }

  //método para fazer o logout do usuário
  logout(): void {
    if(confirm('Deseja realmente sair do sistema?')) {

      //apagar os dados gravados na local storage
      this.authHelper.signOut();

      //redirecionar o usuário de volta para a página inicial
      this.router.navigate(['pages/autenticar-usuario'])
        .then(() => {
          location.reload(); //recarregar a página no navegador
      });
    }
  }

}
