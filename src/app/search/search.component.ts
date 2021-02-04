
import { Component, ElementRef, OnInit, ViewChild } from "@angular/core";
import { RadSideDrawer } from "nativescript-ui-sidedrawer";
import { Application, Color, View } from "@nativescript/core";
import { NoticiasServices } from "../domain/noticias.service";
import { RouterExtensions } from "@nativescript/angular";
import * as Toast from "nativescript-toasts";
import { AppState } from "../app.module";
import { Store } from "@ngrx/store";
import { Noticia, NuevaNoticiaAction } from "../domain/noticias-state.model";
@Component({
    selector: "Search",
    templateUrl: "./search.component.html",
  //  providers: [NoticiasServices]
})
export class SearchComponent implements OnInit {
  resultados: Array<string>;
  textFieldValue: string;
  @ViewChild("layout") layout: ElementRef;

    constructor(private noticias: NoticiasServices, 
      private routerExtensions: RouterExtensions,
      private store: Store<AppState>
      ) {
        // Use the component constructor to inject providers.
    }

    ngOnInit(): void {
      this.store.select((state)=>  state.noticias.sugerida)
      .subscribe((data)=>{
        const f = data;
        if(f != null){
          Toast.show({text: "Sugerimos leer: "+f.titulo, duration: Toast.DURATION.SHORT});
        }
      });
    }

    onDrawerButtonTap(): void {
        const sideDrawer = <RadSideDrawer>Application.getRootView();
        sideDrawer.showDrawer();
    }
	
    onButtonTap(){
      this.noticias.agregar(this.textFieldValue).then((r: any)=>{
        console.log("resultados buscar ahora"+JSON.stringify(r));
        this.resultados  = r;      
      });
    }



    onItemTap(x): void {
      console.dir(x);

    //   this.routerExtensions.navigate(["/DetalleSearch"], {
    //     transition: {
    //         name: "fade"
    //     }
    // });

       this.store.dispatch(new NuevaNoticiaAction(new Noticia(x.view.bindingContext)));

    }

    
    buscarAhora(s: string ) {

      console.dir("Buscar ahora"+s);
      this.noticias.buscar(s).then((r: any)=>{
        console.log("resultados buscar ahora"+JSON.stringify(r));
        this.resultados  = r;
      },(e) => {
        console.log("error buscar ahora"+e);
        Toast.show({ text: "Error en la busqueda", duration: Toast.DURATION.SHORT});
      });


   
 
       
  }
}
