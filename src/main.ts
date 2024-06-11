import { appEvents } from "./shared/app-events";
import { exec, get } from "./shared/base-comp";
import { routes } from "./shared/routes";
import { TemplateComp } from "./shared/components/template-comp";

let template = TemplateComp;

function setVal(obj: any, prop: string, val: any) {
    obj[prop] = val;
}

setVal(window, 'get', get);

setVal(window, 'exec', exec);

setVal(window, appEvents.keys.navToPage, (path: string) => routes.navToPage(path));

if (document.getElementsByTagName('template-comp').length == 0) {
    document.body.innerHTML += '<template-comp></template-comp>';
}
