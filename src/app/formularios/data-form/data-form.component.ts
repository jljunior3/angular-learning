import { Component, OnInit } from '@angular/core';
import {
    FormGroup,
    FormControl,
    FormBuilder,
    Validators,
    FormArray
} from '@angular/forms';
import { Http } from '@angular/http';
import { DropdownService } from 'app/shared/services/dropdown.service';
import Swal from 'sweetalert2';
import { EstadosBr } from './../../shared/models/estados-br.models';
import { ConsultaCepService } from 'app/shared/services/consulta-cep.service';
import { Observable } from 'rxjs/Observable';
import { FormValidations } from 'app/shared/formulario-validations';

@Component({
    selector: 'app-data-form',
    templateUrl: './data-form.component.html',
    styleUrls: ['./data-form.component.css']
})
export class DataFormComponent implements OnInit {
    formulario: FormGroup;
    // estados: EstadosBr[];
    estados: Observable<EstadosBr[]>;
    cargos: any[];
    tecnologias: any[];
    newsletterOp: any[];
    frameworks: any[];

    constructor(
        private formBuilder: FormBuilder,
        private http: Http,
        private dropdowService: DropdownService,
        private consultaCepService: ConsultaCepService
    ) {}

    ngOnInit() {
        this.frameworks = ['Angular', 'React', 'Vue', 'Laravel'];

        // outra forma de criar os formulários reativos
        // this.formulario = new FormGroup({
        //     nome: new FormControl(null),
        //     email: new FormControl(null),

        //     endereco: new FormGroup({
        //         cep: new FormControl(null)
        //     })
        // });

        this.formulario = this.formBuilder.group({
            nome: [
                null,
                [
                    Validators.required,
                    Validators.minLength(3),
                    Validators.maxLength(30)
                ]
            ],
            email: [null, [Validators.required, Validators.email]],
            confirmarEmail: [
                null,
                [Validators.required, FormValidations.equalsTo('email')]
            ],
            endereco: this.formBuilder.group({
                cep: [null, [Validators.required]],
                bairro: [null, [Validators.required]],
                rua: [null, [Validators.required]],
                numero: [null, [Validators.required]],
                complemento: [null, [Validators.required]],
                cidade: [null, [Validators.required]],
                estado: [null, [Validators.required]]
            }),
            cargo: [null],
            tecnologias: [null],
            newsletter: ['s'],
            termos: [null, Validators.pattern('true')],
            frameworks: this.buildFrameworks(),
            numero: [null, FormValidations.numberValidator]
        });

        console.log(this.formulario);

        // forma sem async, apenas com subscribe
        // this.dropdowService
        //     .getEstadosBr()
        //     .subscribe(dados => (this.estados = dados));

        this.estados = this.dropdowService.getEstadosBr();
        this.cargos = this.dropdowService.getCargos();
        this.tecnologias = this.dropdowService.getTecnologias();
        this.newsletterOp = this.dropdowService.getNewsletter();
        // this.buildFrameworks();
    }

    buildFrameworks() {
        const values = this.frameworks.map(v => new FormControl(false));
        return this.formBuilder.array(
            values,
            FormValidations.requiredMinCheckbox(1)
        );

        // outra forma de fazer, que não é dinâmica
        // this.formBuilder.array( [
        //     new FormControl(false),
        //     new FormControl(false),
        //     new FormControl(false),
        //     new FormControl(false)
        // ]);
    }

    validaCampo(campo) {
        return (
            this.formulario.get(campo).invalid &&
            this.formulario.get(campo).touched
        );
    }

    validaEmailValido(campo) {
        const campoEmail = this.formulario.get(campo);
        if (campoEmail.errors) {
            return campoEmail.errors['email'] && campoEmail.touched;
        }
    }

    aplicaCssValidErro(campo) {
        return {
            'is-valid':
                this.formulario.get(campo).valid &&
                this.formulario.get(campo).touched,
            'is-invalid':
                this.formulario.get(campo).invalid &&
                this.formulario.get(campo).touched
        };
    }

    resetar() {
        console.log('chamou');
        this.formulario.reset();
    }

    onSubmit() {
        let valueSubmit = Object.assign({}, this.formulario.value);

        valueSubmit = Object.assign(valueSubmit, {
            frameworks: valueSubmit.frameworks
                .map((v, i) => (v ? this.frameworks[i] : null))
                .filter(v => v !== null)
        });

        console.log('valueSubmit', valueSubmit);

        if (this.formulario.valid) {
            this.http
                .post(
                    'https://httpbin.org/post',
                    JSON.stringify(this.formulario.value)
                )
                .map(res => res)
                .subscribe(
                    dados => {
                        console.log(dados);
                        Swal.fire(
                            'Ótimo Trabalho',
                            'Dados salvos com sucesso!',
                            'success'
                        );
                        this.resetar();
                    },
                    (error: any) =>
                        Swal.fire({
                            type: 'error',
                            title: 'Vixiiii...',
                            text: 'Aconteceu um erro no servidor!'
                        })
                );
        } else {
            this.validaFormularioSubmit(this.formulario);
        }
    }

    validaFormularioSubmit(formGroup: FormGroup) {
        Object.keys(formGroup.controls).forEach(campo => {
            const controle = formGroup.get(campo);
            controle.markAsTouched();

            if (controle instanceof FormGroup) {
                this.validaFormularioSubmit(controle);
                Swal.fire({
                    type: 'error',
                    title: 'Vixiiii...',
                    text: 'Verifique os erros do seu formulário'
                });
            }
        });
    }

    consultaCep() {
        const cep = this.formulario.get('endereco.cep').value;

        if (cep != null && cep !== '') {
            this.consultaCepService
                .consultaCep(cep)
                .subscribe((dados: any) => this.populaDadosForm(dados));
        }
    }

    populaDadosForm(dados) {
        this.formulario.patchValue({
            endereco: {
                cep: dados.cep,
                complemento: dados.complemento,
                rua: dados.logradouro,
                bairro: dados.bairro,
                cidade: dados.localidade,
                estado: dados.uf
            }
        });
    }

    setarCargo() {
        const cargo = {
            nome: 'Dev',
            nivel: 'Pleno',
            desc: 'Dev Pleno'
        };

        this.formulario.get('cargo').setValue(cargo);
    }

    compararCargos(obj1, obj2) {
        return obj1 && obj2
            ? obj1.nome === obj2.nome && obj1.nivel === obj2.nivel
            : obj1 === obj2;
    }

    setarTecnologias() {
        this.formulario
            .get('tecnologias')
            .setValue(['java', 'javascript', 'ruby']);
    }
}
