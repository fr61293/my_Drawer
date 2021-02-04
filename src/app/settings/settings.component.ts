import { Component, OnInit } from "@angular/core";
import * as Toast from "nativescript-toasts"
import { RadSideDrawer } from "nativescript-ui-sidedrawer";
import { Application } from "@nativescript/core";
import * as dialogs from "@nativescript/core/ui/dialogs"

@Component({
    selector: "Settings",
    templateUrl: "./settings.component.html"
})
export class SettingsComponent implements OnInit {

    constructor() {
        // Use the component constructor to inject providers.
    }
	
    doLater(fn) {
        setTimeout(fn, 1000);
    }
	
    ngOnInit(): void {
        /*this.doLater(() =>
            dialogs.action("Mensaje", "Cancelar", ["opcion 1", "opcion 2"]).then((result) => {
                console.log("resultado: " + result);
                if (result === "opcion 1") {
                    this.doLater(() =>
                        dialogs.alert({
                            title: "Titulo 1",
                            message: "Mje 1",
                            okButtonText: "btn 1"
                        }).then(() => console.log("Cerado 1!")));
                } else if (result === "opcion 2") {
                    this.doLater(() => dialogs.alert({
                        title: "Titulo 2",
                        message: "Mje 2",
                        okButtonText: "btn 2"
                    }).then(() => console.log("Cerrado 2")));
                }
            }));
            */
        const toastOptions: Toast.ToastOptions = { text: "Hello world!", duration: Toast.DURATION.SHORT };
        this.doLater(() => Toast.show(toastOptions));
    }
    onDrawerButtonTap(): void {
        const sideDrawer = <RadSideDrawer>Application.getRootView();
        sideDrawer.showDrawer();
    }
}
