import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { CriarTarefasRequest } from "../models/tarefas/criar-tarefas.request";
import { Observable } from "rxjs";
import { CriarTarefasResponse } from "../models/tarefas/criar-tarefas.response";
import { environment } from "../../environments/environment";
import { AuthHelper } from "../helpers/auth.helper";
import { ConsultarTarefasResponse } from "../models/tarefas/consultar-tarefas.response";
import { EditarTarefasRequest } from "../models/tarefas/editar-tarefas.request";
import { EditarTarefasResponse } from "../models/tarefas/editar-tarefas.response";

@Injectable({
    providedIn: 'root'
})
export class TarefasService {

    constructor(
        private httpClient: HttpClient,
        private authHelper: AuthHelper
    ) {}

    /*
        Função para executar a criação de uma tarefa
        na api HTTP POST /api/tarefas/criar
    */
   criar(request: CriarTarefasRequest) : Observable<CriarTarefasResponse> {
        return this.httpClient.post<CriarTarefasResponse>
            (environment.tarefasApi + "/criar", request, {
                headers: this.getHttpHeader()
            });
   }

   /*
        Função para consultar as tarefas na api
        HTTP GET /api/tarefas/consultar
   */
   consultar(): Observable<ConsultarTarefasResponse[]> {
        return this.httpClient.get<ConsultarTarefasResponse[]>
            (environment.tarefasApi + "/consultar", {
                headers: this.getHttpHeader()
            })
   }

   /*
        Função para consultar 1 tarefa na api
        HTTP GET /api/tarefas/obter/{id}
   */
   obter(id: string): Observable<ConsultarTarefasResponse> {
        return this.httpClient.get<ConsultarTarefasResponse>
            (environment.tarefasApi + "/obter/" + id, {
                headers: this.getHttpHeader()
            })
   }

   /*
        Função para excluir uma tarefa na api
        HTTP DELETE /api/tarefas/excluir/{id}
   */
   excluir(id: string): Observable<ConsultarTarefasResponse> {
        return this.httpClient.delete<ConsultarTarefasResponse>
            (environment.tarefasApi + "/excluir/" + id, {
                headers: this.getHttpHeader()
            })
   }

   /*
        Função para alterar uma tarefa na api
        HTTP PUT /api/tarefas/editar
   */
   editar(request: EditarTarefasRequest): Observable<EditarTarefasResponse> {
        return this.httpClient.put<EditarTarefasResponse>
            (environment.tarefasApi + "/alterar/", request, {
                headers: this.getHttpHeader()
            })
   }

   /*
        Método privado para gerar o cabeçalho de autenticação
        das requisições HTTP (API)
   */
   private getHttpHeader(): HttpHeaders {

        //capturando os dados do usuário autenticado
        const usuario = this.authHelper.getUser();

        //criando o cabeçalho da requisição (HEADER)
        const httpHeaders = new HttpHeaders({
            Authorization: 'Bearer ' + usuario?.accessToken
        });

        return httpHeaders;
   }

}