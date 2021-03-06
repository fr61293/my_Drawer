import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NativeScriptCommonModule, NativeScriptRouterModule } from '@nativescript/angular';
import { Routes } from '@angular/router';
import { MensajesComponent } from './mensajes/mensajes.component';

const routes: Routes = [
    { path: "", component: MensajesComponent }
];


@NgModule({
    declarations: [],
  imports: [
      CommonModule,
      NativeScriptCommonModule,
      NativeScriptRouterModule.forChild(routes)
    ],
    exports: [NativeScriptRouterModule]
})
export class CreacionModule { }
