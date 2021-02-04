import { Component, OnInit } from '@angular/core';
import * as Toast from "nativescript-toasts"
import { ItemsService } from '../domain/items.service';
import * as dialogs from "@nativescript/core/ui/dialogs";
import { GestureEventData } from '@nativescript/core/ui/gestures';
import { GridLayout } from '@nativescript/core/ui/layouts/grid-layout';
import { Color } from '@nativescript/core/color';

@Component({
  selector: 'ns-detalle',
  templateUrl: './detalle.component.html',
  styleUrls: ['./detalle.component.css']
})
export class DetalleComponent implements OnInit {

    constructor(private comentario: ItemsService) {
        
    }

    ngOnInit(): void {
        this.comentario.agregarComentario("Excelente");
  }
    onPull(e) {
        console.log("PULLEANDO..");
        const pullRefresh = e.object;
        setTimeout(() => {
            this.comentario.agregarComentario("Muy Bueno");
            pullRefresh.refreshing = false;
        }, 1000);
    };

    botonClicado() {
        dialogs.alert("Diste clic a OK").then(() => {
            console.log("Dialog closed!");
        });
    }
    botonCorregir() {
        const toastOptions: Toast.ToastOptions = { text: "Correcto", duration: Toast.DURATION.SHORT }
        dialogs.action("Corregir", "Cancelar", ["eliminar", "archivar"]).then(result => {
            console.log("Dialog result: " + result);
            if (result == "eliminar") {
                console.log("clic eliminar");
                this.comentario.eliminarUltimo();
            } else if (result == "archivar") {
                console.log("clic archivar");
                this.comentario.listar();
            }
        }).then(() => Toast.show(toastOptions));
    }

    onLongPress(args: GestureEventData) {
        console.log("Objeto que trigger evento: " + args.object);
        console.log("Vista que trigger evento: " + args.view);
        console.log("nombre de evento: " + args.eventName);

        const grid = <GridLayout>args.object;
        grid.animate({
            backgroundColor: new Color("#c6e2ff"),
            duration: 300,
            delay: 300
        }).then(() => grid.animate({
            backgroundColor: new Color("#e8e9e8"),
            duration: 300,
            delay: 300
        }));
    }
}

