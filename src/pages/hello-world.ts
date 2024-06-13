import { appEvents } from "../shared/app-events";
import { BaseComp, CompProps } from "../shared/base-comp";
import { RouterProps } from "../shared/components/router-comp";

export class HelloWorldComp extends BaseComp<CompProps> {
    getHTML(): string {
        let rts: RouterProps = {
            pages: [
                {label: 'Sub Rota 1', name: 'sub-rote1', path: 'subrote1'},
                {label: 'Sub Rota 2', name: 'sub-rote2', path: 'subrote2'}
            ],
            defaultPath: 'subrote1',
            eventName: 'subroteChange',
            pathParam: 'subpage',
            render: () => {}
        }
        this.ref('routes', rts);
        let pgSub2 = rts.pages[1];
        this.ref('nav', (path: string) => appEvents.exec('subroteChange', path));
        return /*html*/`
            <h1>Hello World</h1>
            <button onclick="exec($nav, '${pgSub2?.path}')">Ir para ${pgSub2?.label}</button>
            <router-comp props="$routes"></router-comp>
        `;
    }
}

customElements.define('helloworld-comp', HelloWorldComp);

class SubRote1 extends BaseComp<CompProps> {
    getHTML(): string {
        return /*html*/`
            <p>Sub Rote 1</p>
        `;
    }
}

customElements.define('sub-rote1', SubRote1);

class SubRote2 extends BaseComp<CompProps> {
    getHTML(): string {
        return /*html*/`
            <p>Sub Rote 2</p>
        `;
    }
}

customElements.define('sub-rote2', SubRote2);
