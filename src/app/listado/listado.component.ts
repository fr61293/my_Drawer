import { Component, OnInit } from '@angular/core';
import { RouterExtensions } from '@nativescript/angular';
import { ItemsService } from '../domain/items.service';

@Component({
    selector: 'ns-listado',
    templateUrl: './listado.component.html',
    styleUrls: ['./listado.component.css']
})
export class ListadoComponent implements OnInit {

    constructor(public items: ItemsService, private ruta: RouterExtensions) { }

    ngOnInit(): void {
        this.items.crear("Noticia 1");
        this.items.crear("Noticia 2");
        this.items.crear("Noticia 3");

    }
	
    onItemTap(x): void {     
        console.dir(x);
        switch (x.index) {
            case 0:
                this.ruta.navigate(['/detalle'], {
                    transition: {
                        name: "fade"
                    }
                }); break;
            case 1:
                this.ruta.navigate(['/detalle'], {
                    transition: {
                        name: "fade"
                    }
                }); break;
            case 2:
                this.ruta.navigate(['/detalle'], {
                    transition: {
                        name: "fade"
                    }
                }); break;
            default:
                this.ruta.navigate(['/detalle'], {
                    transition: {
                        name: "fade"
                    }
                }); break;
        }
    }
	
    onPull(e) {
        console.log(e);
        const pullRefresh = e.object;
        let i = 3;
        setTimeout(() => {
            this.items.crear("Noticia " + i);
            pullRefresh.refreshing = false;
        }, 1000);
        i++;
    };
}

