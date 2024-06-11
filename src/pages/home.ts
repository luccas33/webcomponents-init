import { BaseComp, CompProps } from "../shared/base-comp";

export class HomeComp extends BaseComp<CompProps> {
    getHTML(): string {
        return `
            <h1>HOME</h1>
        `;
    }
}

customElements.define('home-comp', HomeComp);
