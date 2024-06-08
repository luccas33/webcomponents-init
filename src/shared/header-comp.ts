import { appEvents } from "./app-events";
import { BaseComp } from "./base-comp";
import { router } from "./router-comp";

export class HeaderComp extends BaseComp {
    getHTML(): string {
        return `
            <div class="content flex-center just-between">
                <div class="init"><h2>Typescript Init</h2></div>
                <navbar-comp></navbar-comp>
            </div>
        `;
    }

    getStyle(): string {
        return `
            .init {width: 250px}

            .init > h2 {text-align: center}
        `;
    }
}

customElements.define('header-comp', HeaderComp);

class NavBarComp extends BaseComp {
    constructor() {
        super();
        appEvents.add(appEvents.keys.navToPage, () => this.render());
    }

    getHTML(): string {
        return `
        <nav>
            <ul>
                ${router.pages.filter(page => !page.active).map(page => {
                    return `
                <li onclick="navToPage('${page.path}')">${page.label}</li>
                    `;
                }).join('')}
            </ul>
        </nav>
        `;
    }

    getStyle(): string {
        return `
            nav {margin-right: 20px}

            li {cursor: pointer}
        `;
    }
}

customElements.define('navbar-comp', NavBarComp);
