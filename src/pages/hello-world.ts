import { BaseComp, CompProps } from "../shared/base-comp";

export class HelloWorldComp extends BaseComp<CompProps> {
    getHTML(): string {
        return /*html*/`
            <h1>Hello World</h1>
        `;
    }
}

customElements.define('helloworld-comp', HelloWorldComp);
