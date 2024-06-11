import { BaseComp, CompProps } from "./base-comp";

export class FooterComp extends BaseComp<CompProps> {
    getHTML(): string {
        return /*html*/`<div class="content flex-center"><h2>FOOTER</h2></div>`;
    }

    getStyle(): string {
        return /*css*/`
            h2 {text-align: center}
        `;
    }
}

customElements.define('footer-comp', FooterComp);
