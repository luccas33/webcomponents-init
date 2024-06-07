import { appEvents } from "./app-events";
import { BaseComp } from "./base-comp";
import { navigator } from "./navigator";

export class HeaderComp extends BaseComp {
    constructor() {
        super();
        appEvents.add(appEvents.keys.navToPage, () => this.render());
    }

    getHTML(): string {
        return `
            <div><h2>Typescript Init</h2></div>
            <nav>
                <ul>
                    ${navigator.pages.filter(page => !page.active).map(page => {
                        return `
                    <li onclick="navToPage('${page.path}')">${page.label}</li>
                        `;
                    }).join('')}
                </ul>
            </nav>
        `;
    }
}

customElements.define('header-comp', HeaderComp);
