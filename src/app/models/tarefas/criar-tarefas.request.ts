/*
    Modelo de dados para a requisição (envio de dados)
    do endpoint: /api/tarefas/criar
*/
export interface CriarTarefasRequest {
    nome : string;
    data : string;
    hora : string;
    prioridade : string;
    tipo : string;
    categoria : string;
    descricao : string;
}