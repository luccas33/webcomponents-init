import { BaseComp } from "./base-comp";
import { HeaderComp } from "./header-comp";
import { MenuComp } from "./menu";
import { RouterComp } from "./router-comp";
import { FooterComp } from "./footer";

const components = [HeaderComp, MenuComp, RouterComp, FooterComp];

export class TemplateComp extends BaseComp {
    constructor() {
        super();
    }
    getHTML(): string {
        return `
            <header-comp></header-comp>
            <div class="main">
                <menu-comp></menu-comp>
                <router-comp></router-comp>
            </div>
            <footer-comp></footer-comp>
        `;
    }
}

customElements.define('template-comp', TemplateComp);
