/*
    Modelo de dados para a requisição (envio de dados)
    do endpoint: /api/tarefas/alterar
*/
export interface EditarTarefasRequest {
    id: string;
    nome : string;
    data : string;
    hora : string;
    prioridade : string;
    tipo : string;
    categoria : string;
    descricao : string;
}