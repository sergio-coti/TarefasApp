import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { TarefasService } from '../../../services/tarefas.service';
import { CriarTarefasRequest } from '../../../models/tarefas/criar-tarefas.request';
import { MessagesComponent } from '../../layout/messages/messages.component';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-criar-tarefas',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MessagesComponent
  ],
  templateUrl: './criar-tarefas.component.html',
  styleUrl: './criar-tarefas.component.css'
})
export class CriarTarefasComponent {

    //atributos
    mensagem: string = '';

    //método construtor
    constructor(
      private tarefasService: TarefasService,
      private spinnerService: NgxSpinnerService
    ) {}

    //estrutura do formulário
    form = new FormGroup({
      nome: new FormControl('', [Validators.required]),
      data: new FormControl('', [Validators.required]),
      hora: new FormControl('', [Validators.required]),
      prioridade: new FormControl('', [Validators.required]),
      tipo: new FormControl('', [Validators.required]),
      categoria: new FormControl('', [Validators.required]),
      descricao: new FormControl('', [Validators.required]),
    });

    get f(): any {
      return this.form.controls;
    }

    //função para capturar o SUBMIT do formulário
    onSubmit(): void {

      const request: CriarTarefasRequest = {
        nome : this.form.value.nome as string,
        data : this.form.value.data as string,
        hora : this.form.value.hora as string,
        tipo : this.form.value.tipo as string,
        prioridade : this.form.value.prioridade as string,
        categoria : this.form.value.categoria as string,
        descricao : this.form.value.descricao as string
      }

      this.spinnerService.show();

      this.tarefasService.criar(request)
        .subscribe({
          next: (data) => {
            this.mensagem = `Tarefa "${data.nome}", cadastrada com sucesso.`;
            this.form.reset(); //limpar os campos do formulário
          },
          error: (e) => {
            console.log(e.error);
          }
        })
        .add(() => {
          this.spinnerService.hide();
        })
    }
}
