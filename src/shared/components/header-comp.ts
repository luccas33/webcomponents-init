import { BaseComp, CompProps } from "../base-comp";

export class HeaderComp extends BaseComp<CompProps> {
    getHTML(): string {
        return /*html*/`
            <div class="content flex-center just-between">
                <div class="init"><h2>Typescript Init</h2></div>
            </div>
        `;
    }

    getStyle(): string {
        return /*css*/`
            .init {width: 250px}

            .init > h2 {text-align: center}
        `;
    }
}

customElements.define('header-comp', HeaderComp);
