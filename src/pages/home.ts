import { BaseComp } from "../shared/base-comp";

export class HomeComp extends BaseComp {
    getHTML(): string {
        return `
            <h1>HOME</h1>
        `;
    }
}

customElements.define('home-comp', HomeComp);
