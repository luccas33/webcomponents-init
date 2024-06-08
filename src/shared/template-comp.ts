import { BaseComp } from "./base-comp";
import { HeaderComp } from "./header-comp";
import { MenuComp } from "./menu";
import { RouterComp } from "./router-comp";
import { FooterComp } from "./footer";

const components = [HeaderComp, MenuComp, RouterComp, FooterComp];

export class TemplateComp extends BaseComp {
    getHTML(): string {
        return `
            <div class="header"><header-comp></header-comp></div>
            <div class="content flex-center">
                <div class="menu"><menu-comp></menu-comp></div>
                <div class="router"><router-comp></router-comp></div>
            </div>
            <div class="footer"><footer-comp></footer-comp></div>
        `;
    }

    getStyle(): string {
        return `
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
