import { BaseComp } from "./base-comp";

export class MenuComp extends BaseComp {
    getHTML(): string {
        return /*html*/`<div class="content"><h2>MENU</h2></div>`;
    }

    getStyle(): string {
        return /*css*/`
            .content {
                min-height: 100%;
                background-color: var(--sc);
                padding: 0 3px;
            }
        `;
    }
}

customElements.define('menu-comp', MenuComp);
