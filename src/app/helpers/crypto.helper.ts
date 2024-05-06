import { Injectable } from "@angular/core";
import * as CryptoJS from 'crypto-js';

@Injectable({
    providedIn: 'root'
})
export class CryptoHelper {
    
    key : string = '67b4f3da-04ef-4513-8f6f-8d217d8ea98e';

    /*
        Função para criptografar um valor
    */
    encrypt(data: string): string {
        return CryptoJS.AES.encrypt(data, this.key)
            .toString();
    }

    /*
        Função para descriptografar um valor
    */
   decrypt(data: string): string {
        return CryptoJS.AES.decrypt(data, this.key)
            .toString(CryptoJS.enc.Utf8);
   }
}