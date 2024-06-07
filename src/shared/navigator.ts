import { appEvents } from "./app-events";

enum Paths {
    Home = 'home',
    HelloWorld = 'helloworld'
}

const pages: {name: string, path: string, label: string, active?: boolean}[] = [
    {name: 'home-comp', label: 'Home', path: Paths.Home},
    {name: 'helloworld-comp', label: 'Hello World', path: Paths.HelloWorld}
];

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
    } else {
        appEvents.exec(appEvents.keys.navToPage);
    }
    let url = new URL(document.location.href);
    url.searchParams.set('page', path);
    window.history.pushState(null, '', url.toString());
}

export const navigator = {
    pages,
    paths: Paths,
    restorePage,
    navToPage
};
