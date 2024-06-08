import { BaseComp } from "./base-comp";

export class FooterComp extends BaseComp {
    getHTML(): string {
        return `<div class="content flex-center"><h2>FOOTER</h2></div>`;
    }

    getStyle(): string {
        return `
            h2 {text-align: center}
        `;
    }
}

customElements.define('footer-comp', FooterComp);
