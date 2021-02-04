import { Component, OnInit } from "@angular/core";
import { RadSideDrawer } from "nativescript-ui-sidedrawer";
import { Application, GestureEventData, GridLayout } from "@nativescript/core";

@Component({
    selector: "Featured",
    templateUrl: "./featured.component.html"
})
export class FeaturedComponent implements OnInit {

    constructor() {
        // Use the component constructor to inject providers.
    }

    ngOnInit(): void {
        // Init your component properties here.
    }

    onDrawerButtonTap(): void {
        const sideDrawer = <RadSideDrawer>Application.getRootView();
        sideDrawer.showDrawer();
    }

    onLongPress(args: GestureEventData) {
        console.log("Objeto que trigger evento: " + args.object);
        console.log("Vista que trigger evento: " + args.view);
        console.log("nombre de evento: " + args.eventName);

        const grid = <GridLayout>args.object;
        grid.animate({
            rotate: 360,
            duration: 1500
        });
    }
}

