import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptModule } from "@nativescript/angular";
import { NativeScriptUISideDrawerModule } from "nativescript-ui-sidedrawer/angular";
import { NoticiasServices } from "./domain/noticias.service";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { ActionReducerMap , StoreModule as NgRxStoreModule } from "@ngrx/store";

import { intializeNoticiasState, noticiasEffects, NoticiasState, reducerNoticias } from "./domain/noticias-state.model";
import { EffectsModule } from "@ngrx/effects";


// inicio redux
export interface AppState{
    noticias: NoticiasState;
}

const reducers: ActionReducerMap<AppState> ={
    noticias: reducerNoticias
};

const reducersInitialState = {
    //noticias: intializeNoticias()
    noticias: initializeNoticiasState()
}
// fin redux

@NgModule({
    bootstrap: [
        AppComponent
    ],
    imports: [
        AppRoutingModule,
        NativeScriptModule,
        NativeScriptUISideDrawerModule,
        NgRxStoreModule.forRoot(reducers, { initialState: reducersInitialState}),
        EffectsModule.forRoot([noticiasEffects])
    ],
    declarations: [
        AppComponent
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ],
    providers: [NoticiasServices]
})

export class AppModule { }

function initializeNoticiasState() {
    throw new Error("Function not implemented.");
}
/*
function intializeNoticias() {
    throw new Error("Function not implemented.");
}*/

