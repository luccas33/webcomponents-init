import { appEvents } from "../app-events";
import { BaseComp, CompProps } from "../base-comp";
import { routes } from "../routes";

interface MenuProps extends CompProps {
    openCloseMenu: Function
}

export class MenuComp extends BaseComp<MenuProps> {
    getHTML(): string {
        this.ref('mouseover', () => this.openCloseMenu());
        return /*html*/`
            <button class="open-close-menu opened" onmouseover="exec($mouseover)">|||</button>
            <div class="content">
                <h2>MENU</h2>
                <navbar-comp></navbar-comp>
            </div>
            `;
    }

    openCloseMenu() {
        this.props.openCloseMenu();
        let btn = this.shadow.querySelector('.open-close-menu');
        let content = this.shadow.querySelector('.content');
        if (!btn || !content) return;
        if (btn.classList.contains('opened')) {
            btn.classList.remove('opened');
            btn.classList.add('closed');
            setTimeout(() => content.classList.add('hidden'), 500);
            return;
        }
        btn.classList.remove('closed');
        btn.classList.add('opened');
        setTimeout(() => content.classList.remove('hidden'), 500);
    }

    getStyle(): string {
        return /*css*/`
            .content {
                background-color: var(--sc);
                padding: 0 3px;
            }

            .content > h2 {text-align: center}

            .hidden {
                display: none;
            }

            .open-close-menu {
                float: right;
                top: 5px;
                right: 5px;
                border-radius: 50%;
                cursor: pointer;
                border: none;
                width: 25px;
                height: 25px;
                background: var(--pc);
                color: white;
                font-weight: bold;
            }
        `;
    }
}

customElements.define('menu-comp', MenuComp);

class NavBarComp extends BaseComp<CompProps> {
    constructor() {
        super();
        appEvents.add(appEvents.keys.navToPage, () => this.render());
    }

    getHTML(): string {
        return /*html*/`
        <nav>
            <ul>
                ${routes.pages.filter(page => !page.active).map(page => {
                    return /*html*/`
                <li onclick="navToPage('${page.path}')">${page.label}</li>
                    `;
                }).join('')}
            </ul>
        </nav>
        `;
    }

    getStyle(): string {
        return /*css*/`
            nav {margin-right: 20px}

            li {cursor: pointer}
        `;
    }
}

customElements.define('navbar-comp', NavBarComp);
