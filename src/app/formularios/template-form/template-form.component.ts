import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { ConsultaCepService } from 'app/shared/services/consulta-cep.service';

@Component({
    selector: 'app-template-form',
    templateUrl: './template-form.component.html',
    styleUrls: ['./template-form.component.css']
})
export class TemplateFormComponent implements OnInit {
    usuario: any = {
        nome: null,
        email: null
    };

    constructor(
        private http: Http,
        private consultaCepService: ConsultaCepService
    ) {}

    ngOnInit() {}

    validaCampo(campo) {
        return campo.invalid && campo.touched;
    }

    aplicaCssValidErro(campo) {
        return {
            'is-valid': campo.valid && campo.touched,
            'is-invalid': campo.invalid && campo.touched
        };
    }

    onSubmit(form) {
        console.log(form);
    }

    consultaCep(cep, form) {
        if (cep != null && cep !== '') {
            this.consultaCepService
                .consultaCep(cep)
                .subscribe((dados: any) => this.populaDadosForm(dados, form));
        }
    }

    populaDadosForm(dados, formulario) {
        formulario.form.patchValue({
            endereco: {
                complemento: dados.complemento,
                rua: dados.logradouro,
                bairro: dados.bairro,
                cidade: dados.localidade,
                estado: dados.uf
            }
        });
    }

    resetaDadosForm(formulario) {
        formulario.form.patchValue({
            endereco: {
                complemento: null,
                rua: null,
                bairro: null,
                cidade: null,
                estado: null
            }
        });
    }
}
