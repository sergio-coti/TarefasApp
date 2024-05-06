/*
    Modelo de dados para a requisição (envio de dados)
    do endpoint: /api/usuarios/criar
*/
export interface CriarUsuarioRequest {
  nome: string;
  email: string;
  senha: string;
}
