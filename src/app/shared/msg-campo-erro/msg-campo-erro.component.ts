import { Component, OnInit, Input } from '@angular/core';

@Component({
    selector: 'app-msg-campo-erro',
    templateUrl: './msg-campo-erro.component.html',
    styleUrls: ['./msg-campo-erro.component.css']
})
export class MsgCampoErroComponent implements OnInit {
    @Input() campo;
    @Input() mensagem;

    constructor() {}

    ngOnInit() {}
}
