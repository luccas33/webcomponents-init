import { appEvents } from "./app-events";
import { BaseComp } from "./base-comp";
import { navigator } from "./navigator";
import { HomeComp } from "../pages/home";
import { HelloWorldComp } from "../pages/hello-world";

const components = [HomeComp, HelloWorldComp];

export class RouterComp extends BaseComp {
    constructor() {
        super();
        appEvents.add(appEvents.keys.navToPage, () => this.render());
    }

    getHTML(): string {
        let page = navigator.pages.find(pg => pg.active)?.name || 'home-comp';
        return `<${page}></${page}>`;
    }
}

customElements.define('router-comp', RouterComp);
