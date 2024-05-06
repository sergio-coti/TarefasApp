/*
    Modelo de dados para a resposta (consulta)
    do endpoint: /api/tarefas/consultar
*/
export interface ConsultarTarefasResponse {
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