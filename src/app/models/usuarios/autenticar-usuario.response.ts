/*
    Modelo de dados para a resposta (retorno de dados)
    do endpoint: /api/usuarios/autenticar
*/
export interface AutenticarUsuarioResponse {
  id: string;
  nome: string;
  email: string;
  accessToken: string;
  dataHoraExpiracao: string;
}
