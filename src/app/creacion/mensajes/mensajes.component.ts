import { Component, OnInit } from '@angular/core';
import { RouterExtensions } from '@nativescript/angular';

@Component({
  selector: 'ns-mensajes',
  templateUrl: './mensajes.component.html',
  styleUrls: ['./mensajes.component.css']
})
export class MensajesComponent implements OnInit {

    constructor(private ruta: RouterExtensions) { }

  ngOnInit(): void {
  }
    ir() {
        console.log("CLICADO");
        this.ruta.navigate(['/notificacion'], {
            transition: {
                name:"fade"
            }
        })
    }
}

