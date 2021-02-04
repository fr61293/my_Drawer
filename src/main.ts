// this import should be first in order to load some required settings (like globals and reflect-metadata)
import { registerElement } from "@nativescript/angular";
import { platformNativeScriptDynamic } from "@nativescript/angular";

import { AppModule } from "./app/app.module";

registerElement("PullToRefresh", () => require("@nstudio/nativescript-pulltorefresh").PullToRefresh);
platformNativeScriptDynamic().bootstrapModule(AppModule);
import { android, ios } from "@nativescript/core/application";
if (android) {
    console.log("TEST ANDROID MAIN.TS");
}
if (ios) {
    console.log("TEST IOS");
}
