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
                <div class="menu"><menu-comp></menu-comp></div>
                <div class="router"><router-comp props="$routes"></router-comp></div>
            </div>
            <div class="footer"><footer-comp></footer-comp></div>
        `;
    }

    getStyle(): string {
        return /*css*/`
            .header {
                height: 75px;
                background-color: var(--pc);
                padding: 0 5px;
            }

            .content {
                min-height: calc(100vh - 170px);
            }

            .menu, .router {
                min-height: calc(100vh - 170px);
                padding: 0 5px;
            }

            .menu {
                width: 250px;
                background-color: var(--sc);
            }

            .router {width: calc(100% - 250px)}

            .footer {
                height: 75px;
                background-color: var(--pc);
            }
        `;
    }
}

customElements.define('template-comp', TemplateComp);
