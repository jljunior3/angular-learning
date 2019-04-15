import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { of } from 'rxjs/observable/of';

@Injectable()
export class ConsultaCepService {
    constructor(private http: Http) {}

    consultaCep(cep: string) {
        cep = cep.replace('-', '');

        const validaCep = /^[0-9]{8}$/;

        if (validaCep.test(cep)) {
            // setTimeout(() => {
            return this.http
                .get(`//viacep.com.br/ws/${cep}/json`)
                .map((res: Response) => res.json());
            // }, 1000);
        }

        return of({});
    }
}
