import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { TarefasService } from '../../../services/tarefas.service';
import { MessagesComponent } from '../../layout/messages/messages.component';
import { EditarTarefasRequest } from '../../../models/tarefas/editar-tarefas.request';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-editar-tarefas',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MessagesComponent
  ],
  templateUrl: './editar-tarefas.component.html',
  styleUrl: './editar-tarefas.component.css'
})
export class EditarTarefasComponent implements OnInit {

    mensagem: string = '';

    constructor(
      private activatedRoute: ActivatedRoute,
      private tarefaService: TarefasService,
      private spinnerService: NgxSpinnerService
    ) {}

    ngOnInit(): void {
        //capturando o id da tarefa enviado na URL (rota)
        const id = this.activatedRoute.snapshot.params['id'];

        this.spinnerService.show();

        //consultando os dados da tarefa através do id
        this.tarefaService.obter(id)
          .subscribe({
            next: (tarefa) => {
              
              //preenchendo o formulário
              this.form.controls['id'].setValue(tarefa.id);
              this.form.controls['nome'].setValue(tarefa.nome);
              this.form.controls['data'].setValue(tarefa.data.split('T')[0]);
              this.form.controls['hora'].setValue(tarefa.hora);
              this.form.controls['prioridade'].setValue(tarefa.prioridade);
              this.form.controls['tipo'].setValue(tarefa.tipo);
              this.form.controls['categoria'].setValue(tarefa.categoria);
              this.form.controls['descricao'].setValue(tarefa.descricao);
            },
            error: (e) => {
              console.log(e.error);
            }
          })
          .add(() => {
            this.spinnerService.hide();
          });
    }

    //estrutura do formulário
    form = new FormGroup({
      id: new FormControl(''),
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

    onSubmit(): void {
      
        const request: EditarTarefasRequest = {
          id : this.form.value.id as string,
          nome : this.form.value.nome as string,
          data : this.form.value.data as string,
          hora : this.form.value.hora as string,
          tipo : this.form.value.tipo as string,
          prioridade : this.form.value.prioridade as string,
          categoria : this.form.value.categoria as string,
          descricao : this.form.value.descricao as string
        }

        this.spinnerService.show();

        this.tarefaService.editar(request)
          .subscribe({
            next: (data) => {
              this.mensagem = `Tarefa "${data.nome}", atualizada com sucesso.`;
            },
            error: (e) => {
              console.log(e.error);
            }
          })
          .add(() => {
            this.spinnerService.hide();
          });
    }
}
