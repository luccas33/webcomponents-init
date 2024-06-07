import { exec, get } from "./shared/base-comp";
import { navigator } from "./shared/navigator";
import { TemplateComp } from "./shared/template-comp";

let template = TemplateComp;

function setVal(obj: any, prop: string, val: any) {
    obj[prop] = val;
}

setVal(window, 'get', get);

setVal(window, 'exec', exec);

setVal(window, 'restorePage', navigator.restorePage);

setVal(window, 'navToPage', navigator.navToPage);
