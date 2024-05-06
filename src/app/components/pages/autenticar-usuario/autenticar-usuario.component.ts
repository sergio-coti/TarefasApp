import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { UsuariosService } from '../../../services/usuarios.service';
import { AutenticarUsuarioRequest } from '../../../models/usuarios/autenticar-usuario.request';
import { Router } from '@angular/router';
import { AuthHelper } from '../../../helpers/auth.helper';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-autenticar-usuario',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './autenticar-usuario.component.html',
  styleUrl: './autenticar-usuario.component.css'
})
export class AutenticarUsuarioComponent {

  //atributos (variáveis)
  mensagemErro: string = '';

  /*
    Método construtor para inicialização
    de classes ou bibliotecas
  */
  constructor(
    private usuariosService: UsuariosService,
    private spinnerService: NgxSpinnerService,
    private authHelper: AuthHelper,
    private router: Router
  ) {
  }

  /*
    Variável utilizada para capturarmos
    cada campo do formulário
  */
  form = new FormGroup({
    /* campo 'email' */
    email : new FormControl('', [Validators.required, Validators.email]),
    /* campo 'senha' */
    senha : new FormControl('', [Validators.required, Validators.minLength(8)])
  });

  /*
    Função auxiliar utilizada para que possamos
    verificar se cada campo do formulário
    está com erro de preenchimento (erro de validação)
  */
  get f() {
    return this.form.controls;
  }

  /*
    Função para capturar o evento
    SUBMIT do formulário
  */
  onSubmit() : void {

    //criando um objeto de modelo de dados
    const request : AutenticarUsuarioRequest = {
      email: this.form.value.email as string,
      senha: this.form.value.senha as string
    };

    //exibindo o spinner
    this.spinnerService.show();
    
    //executando a autenticação do usuário
    this.usuariosService.autenticar(request)
      .subscribe({ //capturar o retorno da API
        next: (data) => { //recebendo mensagem de sucesso
          
          //armazenar os dados do usuário autenticado em sessão
          this.authHelper.signIn(data);

          //redirecionar para a página de dashboard do sistema
          this.router.navigate(['admin/dashboard'])
            .then(() => {
              location.reload(); //recarregar a página no navegador
            });
        },
        error: (e) => { //recebendo mensagem de erro
          this.mensagemErro = e.error.message;
        }
      })
      .add(() => {
        this.spinnerService.hide();
      })
  }

}
