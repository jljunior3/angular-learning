import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { FormulariosRoutingModule } from './formularios-routing.module';
import { TemplateFormComponent } from './template-form/template-form.component';
import { DataFormComponent } from './data-form/data-form.component';
import { MenuComponent } from './menu/menu.component';
import { SharedModule } from 'app/shared/shared.module';

import { NgxMaskModule } from 'ngx-mask';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        FormulariosRoutingModule,
        HttpModule,
        ReactiveFormsModule,
        SharedModule,
        NgxMaskModule.forRoot()
    ],
    exports: [TemplateFormComponent, DataFormComponent, MenuComponent],
    declarations: [TemplateFormComponent, DataFormComponent, MenuComponent]
})
export class FormulariosModule {}
