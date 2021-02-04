import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

//Estado
export class Noticia{
    constructor(public titulo: string){}

}

export interface NoticiasState{
    items: Noticia[],
    sugerida: Noticia;
}




export function  intializeNoticias(){
    return {
        items: [],
        sugerida: null    
    };
};

//Acciones
export enum NoticiasActiontype{
    INIT_MY_DATA = '[Noticias] Init My Data',
    NUEVA_NOTICIA = '[Noticias] Nueva',
    SUGERIR_NOTICIA = '[Noticias] Sugerir'

}

export class InitMyDataAction  implements Action{
    type= NoticiasActiontype.INIT_MY_DATA;
    constructor(public titulares: Array<string>){ }

}

export class NuevaNoticiaAction implements Action{
    type= NoticiasActiontype.NUEVA_NOTICIA;
    constructor(public noticia: Noticia){ }

}


export class SugerirAction implements Action{
    type= NoticiasActiontype.SUGERIR_NOTICIA;
    constructor(public noticia: Noticia){ }

}


export type NoticiasViajesActions = InitMyDataAction | NuevaNoticiaAction
|SugerirAction  

//Reducers

export function reducerNoticias(
    state: NoticiasState,
    action: NoticiasViajesActions
):NoticiasState{
 switch(action.type)
    {
        case NoticiasActiontype.INIT_MY_DATA: {
            const titulares: Array<string> = (action as InitMyDataAction).titulares;
       
            return { ...state,
                items: titulares.map((t) => new Noticia(t)) };
        }
        case NoticiasActiontype.NUEVA_NOTICIA: {
            return {
                ...state,
                items: [...state.items, (action as NuevaNoticiaAction).noticia]
            };
        }
        case NoticiasActiontype.SUGERIR_NOTICIA: {
       
            return {
                ...state,
                sugerida: (action as SugerirAction).noticia
               
            };
        }     

     

    }
return state;

}
//effects 
@Injectable()
export class noticiasEffects{
    @Effect()
    nuevoagregado: Observable<Action> = this.actions$.pipe(
        ofType(NoticiasActiontype.NUEVA_NOTICIA),
        map((action: NuevaNoticiaAction)=> new SugerirAction(action.noticia))
    );
        constructor(private actions$: Actions){}
}

