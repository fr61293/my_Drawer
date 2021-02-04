import { Injectable } from '@angular/core';

@Injectable()
export class ItemsService {
    esVacio() {
        throw new Error('Method not implemented.');
    }
    private items: Array<string> = [];
    private comentarios: Array<string> = [];

    crear(n:string) {
        this.items.push(n);
    }
    listar() {
        return this.items;
    }
    eliminarUltimo() {
        this.comentarios.pop();

    }

    agregarComentario(c: string) {
        this.comentarios.push(c);
    }

    mostrarComentarios() {
        return this.comentarios;
    }
}

