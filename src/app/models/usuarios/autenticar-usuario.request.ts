/*
    Modelo de dados para a requisição (envio de dados)
    do endpoint: /api/usuarios/autenticar
*/
export interface AutenticarUsuarioRequest {
    email : string;
    senha : string;
}