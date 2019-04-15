import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';
import { FormDebugComponent } from './form-debug/form-debug.component';
import { MsgCampoErroComponent } from './msg-campo-erro/msg-campo-erro.component';

import { DropdownService } from './services/dropdown.service';
import { ConsultaCepService } from './services/consulta-cep.service';

@NgModule({
    imports: [CommonModule, HttpModule],
    declarations: [FormDebugComponent, MsgCampoErroComponent],
    exports: [FormDebugComponent, MsgCampoErroComponent],
    providers: [DropdownService, ConsultaCepService]
})
export class SharedModule {}
