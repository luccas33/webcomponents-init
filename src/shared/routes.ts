import { HelloWorldComp } from "../pages/hello-world";
import { HomeComp } from "../pages/home";
import { appEvents } from "./app-events";
import { Page } from "./components/router-comp";

const pageClasses = [HomeComp, HelloWorldComp];

enum paths {
    Home = 'home',
    HelloWorld = 'helloworld'
}

const pages: Page[] = [
    {name: 'home-comp', label: 'Home', path: paths.Home},
    {name: 'helloworld-comp', label: 'Hello World', path: paths.HelloWorld}
];

function navToPage(path: string) {
    appEvents.exec(appEvents.keys.navToPage, path);
}

export const routes = {
    paths, pages, navToPage
}
