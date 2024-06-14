import { BaseComp, CompProps } from "../base-comp";
import { HeaderComp } from "./header-comp";
import { MenuComp } from "./menu-comp";
import { RouterComp, RouterProps } from "./router-comp";
import { FooterComp } from "./footer-comp";
import { appEvents } from "../app-events";
import { routes } from "../routes";

const components = [HeaderComp, MenuComp, RouterComp, FooterComp];

export class TemplateComp extends BaseComp<CompProps> {
    getHTML(): string {
        this.ref('menuProps', {openCloseMenu: () => this.openCloseMenu()});
        let rts: RouterProps = {
            pages: routes.pages,
            defaultPath: routes.paths.Home,
            pathParam: 'page',
            eventName: appEvents.keys.navToPage,
            render: () => {}
        }
        this.ref('routes', rts);
        return /*html*/`
            <div class="header"><header-comp></header-comp></div>
            <div class="content flex-center">
                <div class="menu opened"><menu-comp props="$menuProps"></menu-comp></div>
                <div class="router opened"><router-comp props="$routes"></router-comp></div>
            </div>
            <div class="footer"><footer-comp></footer-comp></div>
        `;
    }

    openCloseMenu() {
        let menu = this.shadow.querySelector('.menu');
        let router = this.shadow.querySelector('.router');
        if (!menu || !router) return;
        if (menu.classList.contains('opened')) {
            menu.classList.remove('opened');
            router.classList.remove('opened');
            menu.classList.add('closed');
            router.classList.add('closed');
            return;
        }
        menu.classList.remove('closed');
        router.classList.remove('closed');
        menu.classList.add('opened');
        router.classList.add('opened');
    }

    getStyle(): string {
        return /*css*/`
            .header {
                height: 75px;
                background-color: var(--pc);
                padding: 0 5px;
            }

            .content {
                min-height: calc(100vh - 150px);
                align-items: stretch;
            }

            .router {
                padding: 5px;
            }

            .menu {
                background-color: var(--sc);
                box-shadow: 0 1px 3px rgba(0, 0, 0, 0.5)
            }

            .menu.opened {
                width: 250px;
                transition: 1.5s;
            }

            .menu.closed {
                width: 30px;
                transition: 1.5s;
            }

            .router.opened {
                width: calc(100% - 250px);
                transition: 1.5s;
            }

            .router.closed {
                width: calc(100% - 30px);
                transition: 1.5s;
            }

            .footer {
                height: 75px;
                background-color: var(--pc);
            }
        `;
    }
}

customElements.define('template-comp', TemplateComp);
