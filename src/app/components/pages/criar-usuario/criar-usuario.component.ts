import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { UsuariosService } from '../../../services/usuarios.service';
import { CriarUsuarioRequest } from '../../../models/usuarios/criar-usuario.request';
import { PasswordMatchValidator } from '../../../validators/password-match.validator';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-criar-usuario',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './criar-usuario.component.html',
  styleUrl: './criar-usuario.component.css'
})
export class CriarUsuarioComponent {

  //atributos (variáveis)
  mensagemSucesso: string = '';
  mensagemErro: string = '';

  //método construtor
  constructor(
    private usuariosService: UsuariosService,
    private spinnerService: NgxSpinnerService
  ) {}

  /* estrutura do formulário */
  form = new FormGroup({
    nome : new FormControl('', [
      Validators.required, 
      Validators.minLength(8)
    ]),
    email : new FormControl('', [
      Validators.required, 
      Validators.email
    ]),
    senha : new FormControl('', [
      Validators.required,
      Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)
    ]),
    senhaConfirmacao : new FormControl('', [
      Validators.required
    ])
  }, {
    /* adicionando a classe de validação customizada */
    validators: [PasswordMatchValidator.matchPassword]
  });

  /* função para verificar o estado dos campos */
  get f() {
    return this.form.controls;
  }

  /* função para capturar o SUBMIT */
  onSubmit(): void {

    //limpar as mensagens exibidas na página
    this.mensagemSucesso = '';
    this.mensagemErro = '';
    
    const request: CriarUsuarioRequest = {
      nome : this.form.value.nome as string,
      email : this.form.value.email as string,
      senha : this.form.value.senha as string
    }

    this.spinnerService.show();

    this.usuariosService.criar(request)
      .subscribe({ //capturando a resposta da API
        next: (data) => { //recebendo o retorno de sucesso
          //capturando a mensagem de sucesso retornada pela API
          this.mensagemSucesso = `Parabéns, ${data.nome}. Sua conta foi criada com sucesso.`;
          //limpar os campos do formulário
          this.form.reset();
        },
        error: (e) => {
          //capturando a mensagem de erro retornada pela API
          this.mensagemErro = e.error.message;
        }
      })
      .add(() => {
        this.spinnerService.hide();
      });
  }

}
