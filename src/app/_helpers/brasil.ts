import { AbstractControl, Validators } from "@angular/forms";

export class BrazilValidator {
    
    constructor() { }

    /**
     * Valida se o CPF é valido. Pode ser informado com máscara.
    */
    static isValidCpf() {
        return (control: AbstractControl) => {
            var cpf = control.value;
            if (cpf) {
                cpf = cpf.replace(/[^\d]+/g,'');
                let numbers, digits, sum, i, result, equalDigits;
                equalDigits = 1;
                if (cpf.length < 11) {
                    return { cpfNotValid: true };
                }

                for (i = 0; i < cpf.length - 1; i++) {
                    if (cpf.charAt(i) !== cpf.charAt(i + 1)) {
                        equalDigits = 0;
                        break;
                    }
                }

                if (!equalDigits) {
                    numbers = cpf.substring(0, 9);
                    digits = cpf.substring(9);
                    sum = 0;
                    for (i = 10; i > 1; i--) {
                        sum += numbers.charAt(10 - i) * i;
                    }

                    result = sum % 11 < 2 ? 0 : 11 - (sum % 11);

                    if (result !== Number(digits.charAt(0))) {
                        return { cpfNotValid: true };
                    }
                    numbers = cpf.substring(0, 10);
                    sum = 0;

                    for (i = 11; i > 1; i--) {
                        sum += numbers.charAt(11 - i) * i;
                    }
                    result = sum % 11 < 2 ? 0 : 11 - (sum % 11);

                    if (result !== Number(digits.charAt(1))) {
                        return { cpfNotValid: true };
                    }
                    return null;
                } else {
                    return { cpfNotValid: true };
                }
            }
            return null;
        };
    }

    /**
     * Valida se o CNPJ é valido. Pode ser informado com máscara.
    */
    static isValidCNPJ() {
        return (control: AbstractControl) => {
            var cnpj = control.value;
            if (cnpj) {
                var tamanho, numeros, digitos, soma, pos, i, resultado
                cnpj = cnpj.replace(/[^\d]+/g,'');
            
                if(cnpj == '') return { cnpjNotValid: true };
                if (cnpj.length != 14) return { cnpjNotValid: true };
            
                // Elimina CNPJs invalidos conhecidos
                if (cnpj == "00000000000000" || 
                    cnpj == "11111111111111" || 
                    cnpj == "22222222222222" || 
                    cnpj == "33333333333333" || 
                    cnpj == "44444444444444" || 
                    cnpj == "55555555555555" || 
                    cnpj == "66666666666666" || 
                    cnpj == "77777777777777" || 
                    cnpj == "88888888888888" || 
                    cnpj == "99999999999999")
                    return { cnpjNotValid: true };
                    
                // Valida DVs
                tamanho = cnpj.length - 2
                numeros = cnpj.substring(0,tamanho);
                digitos = cnpj.substring(tamanho);
                soma = 0;
                pos = tamanho - 7;
                for (i = tamanho; i >= 1; i--) {
                    soma += numeros.charAt(tamanho - i) * pos--;
                    if (pos < 2)
                        pos = 9;
                    }
                resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
                if (resultado != digitos.charAt(0))
                    return { cnpjNotValid: true };
                    
                tamanho = tamanho + 1;
                numeros = cnpj.substring(0,tamanho);
                soma = 0;
                pos = tamanho - 7;
                for (i = tamanho; i >= 1; i--) {
                    soma += numeros.charAt(tamanho - i) * pos--;
                    if (pos < 2)
                        pos = 9;
                    };
                resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
                if (resultado != digitos.charAt(1))
                    return { cnpjNotValid: true };
                    
                return null;
            };
            return null;
        };
    }

    /**
     * Valida se um CEP é verdadeiro
     */
    static isValidCEP() {
        return (control : AbstractControl) => {
            const validacep = /^[0-9]{8}$/;
            const cep = control.value.replace(/-/g, "");
            if(cep) {
                if(!validacep.test(cep)) {
                    return { cepNotValid: true } 
                } else {
                    return null
                }
            }
            return null;
        }
    }

    /**
     * Valida de um RG é verdadeiro.
     */
    static isValidRG() {
        return (control : AbstractControl) => {
            const validarg = /(\d{1,2})(\d{3})(\d{3})(\d{1})$/; 
            const rg = control.value.replace(/.|-/g, "");
            if(rg) {
                if(!validarg.test(rg)) {
                    return { rgNotValid : true }
                } else {
                    return null;
                }
            }
            return null;
        }
    }

}