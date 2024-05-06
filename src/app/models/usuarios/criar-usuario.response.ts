/*
    Modelo de dados para a resposta (retorno de dados)
    do endpoint: /api/usuarios/criar
*/
export interface CriarUsuarioResponse {
  id: string;
  nome: string;
  email: string;
}
