import { BaseComp } from "./base-comp";

export class FooterComp extends BaseComp {
    getHTML(): string {
        return `<h2>FOOTER</h2>`;
    }
}

customElements.define('footer-comp', FooterComp);
