/*
    Modelo de dados para a resposta (retorno de dados)
    do endpoint: /api/tarefas/criar
*/
export interface CriarTarefasResponse {
    id : string;
    nome : string;
    data : string;
    hora : string;
    prioridade : string;
    tipo : string;
    categoria : string;
    descricao : string;
    usuarioId : string;
}