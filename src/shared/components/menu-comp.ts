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
            <div class="open-close-menu opened" onmouseover="exec($mouseover)"><div></div><div></div><div></div></div>
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
                width: 30px;
                height: 30px;
                background: var(--pc);
                display: flex;
                align-items: center;
                justify-content: center;
                flex-direction: column;
                gap: 2px;
            }

            .open-close-menu > * {
                height: 2px;
                width: 15px;
                background: white;
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
            ${routes.pages.map(page => {
                return /*html*/`
            <div class="nav-item${page.active ? ' active-page' : ''}" 
                 ${page.active ? '' : `onclick="navToPage(\'${page.path}\')"`}>
                <a>${page.label}</a>
            </div>
                `;
            }).join('')}
        </nav>
        `;
    }

    getStyle(): string {
        return /*css*/`
            nav {
                width: 100%;
            }

            .nav-item {
                cursor: pointer;
                background-color: var(--pc);
                width: calc(100% - 20px);
                padding: 5px 10px;
                color: black;
                font-weight: bold;
                border: 1px solid #267585;
                border-width: 0 1px 1px 0;
            }

            .nav-item.active-page {
                cursor: default;
                color: white;
            }

            nav > div:nth-child(even) {
                background-color: var(--pcl);
            }
        `;
    }
}

customElements.define('navbar-comp', NavBarComp);
