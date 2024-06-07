import { BaseComp } from "./base-comp";

export class MenuComp extends BaseComp {
    getHTML(): string {
        return `<h2>MENU</h2>`;
    }
}

customElements.define('menu-comp', MenuComp);
