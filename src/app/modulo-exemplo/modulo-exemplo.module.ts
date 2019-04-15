import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ModuloExemploRoutingModule } from './modulo-exemplo-routing.module';
import { ExamploComponentComponent } from './examplo-component/examplo-component.component';

@NgModule({
  imports: [
    CommonModule,
    ModuloExemploRoutingModule
  ],
  declarations: [ExamploComponentComponent],
  exports: [
     ExamploComponentComponent
  ],
})
export class ModuloExemploModule { }
