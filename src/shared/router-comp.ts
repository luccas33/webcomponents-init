import { appEvents } from "./app-events";
import { BaseComp } from "./base-comp";
import { HomeComp } from "../pages/home";
import { HelloWorldComp } from "../pages/hello-world";

enum paths {
    Home = 'home',
    HelloWorld = 'helloworld'
}

const pages: {name: string, path: string, label: string, active?: boolean}[] = [
    {name: 'home-comp', label: 'Home', path: paths.Home},
    {name: 'helloworld-comp', label: 'Hello World', path: paths.HelloWorld}
];

const components = [HomeComp, HelloWorldComp];

export class RouterComp extends BaseComp {
    constructor() {
        super();
        appEvents.add(appEvents.keys.navToPage, () => this.render());
    }

    getHTML(): string {
        let page = pages.find(pg => pg.active)?.name || 'home-comp';
        return `<${page}></${page}>`;
    }
}

customElements.define('router-comp', RouterComp);

function restorePage() {
    let params = new URL(document.location.href).searchParams;
    let page = params.get('page') || '';
    page = page.trim() == '' ? 'home' : page.trim();
    navToPage(page);
}

function navToPage(path: string) {
    path = !path || path.trim() == '' ? 'home' : path.trim();
    let page = pages.find(page => page.path == path);
    if (!page) {
        console.log('Page not found!');
        return;
    };
    pages.forEach(page => page.active = false);
    page.active = true;
    if (document.getElementsByTagName('template-comp').length == 0) {
        document.body.innerHTML += '<template-comp></template-comp>';
    }
    appEvents.exec(appEvents.keys.navToPage);
    let url = new URL(document.location.href);
    url.searchParams.set('page', path);
    window.history.pushState(null, '', url.toString());
}

export const router = {
    pages,
    paths,
    restorePage,
    navToPage
};
