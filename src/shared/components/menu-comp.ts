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
            <div class="container">
                <div class="open-close-menu opened" onmouseover="exec($mouseover)"><div></div><div></div><div></div></div>
                <div class="content">
                    <navbar-comp></navbar-comp>
                </div>
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
            .container {
                position: relative;
            }

            .content {
                background-color: var(--sc);
                padding-top: 67px;
            }

            .content > h2 {
                text-align: center;
                margin: 0;
                padding: 10px;
            }

            .hidden {
                display: none;
            }

            .open-close-menu {
                position: absolute;
                top: 0px;
                right: 0px;
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
                transform: translateX(50%) translateY(2px);
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
    connectedCallback() {
        this.addEvent(appEvents.keys.navToPage, () => setTimeout(() => this.render(), 10));
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
                padding: 10px;
                color: white;
                font-weight: bold;
                border-bottom: 1px solid #267585;
            }

            .nav-item.active-page {
                cursor: default;
                background: white;
                color: var(--pc);
            }

        `;
    }
}

customElements.define('navbar-comp', NavBarComp);
