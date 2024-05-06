import { AbstractControl } from "@angular/forms";

/*
    Classe para comparação de senhas
    do formulário de cadastro de usuário
*/
export class PasswordMatchValidator {

    /*
        Função para fazer a comparação dos 
        campos de senha / confirmação de senha
    */
    static matchPassword(abstractControl: AbstractControl) {

        //capturar o valor do campo 'senha'
        let senha = abstractControl.get('senha')?.value;

        //capturar o valor do campo 'senhaConfirmacao'
        let senhaConfirmacao = abstractControl.get('senhaConfirmacao')?.value;

        //verificar se os campos estão preenchidos com valores diferentes
        if(senhaConfirmacao.length > 0 && senha != senhaConfirmacao) {
            //gerando um erro no formulário
            abstractControl.get('senhaConfirmacao')?.setErrors({
                matchPassword: true //nome do erro gerado
            });
        }

        return null;
    }
}