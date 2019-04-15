import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';

@Injectable()
export class DropdownService {
    constructor(private http: Http) {}

    getEstadosBr() {
        return this.http
            .get('assets/dados/estadosbr.json')
            .map((res: Response) => res.json());
    }

    getCargos() {
        return [
            {
                nome: 'Dev',
                nivel: 'Júnior',
                desc: 'Dev Jr'
            },
            {
                nome: 'Dev',
                nivel: 'Pleno',
                desc: 'Dev Pleno'
            },
            {
                nome: 'Dev',
                nivel: 'Sênior',
                desc: 'Dev Sr'
            }
        ];
    }

    getTecnologias() {
        return [
            { nome: 'java', desc: 'Java' },
            { nome: 'php', desc: 'PHP' },
            { nome: 'javascript', desc: 'Javascript' },
            { nome: 'ruby', desc: 'Ruby' }
        ];
    }

    getNewsletter() {
        return [{ nome: 's', desc: 'Sim' }, { nome: 'n', desc: 'Não' }];
    }
}
