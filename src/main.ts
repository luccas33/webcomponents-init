import { exec, get } from "./shared/base-comp";
import { router } from "./shared/router-comp";
import { TemplateComp } from "./shared/template-comp";

let template = TemplateComp;

function setVal(obj: any, prop: string, val: any) {
    obj[prop] = val;
}

setVal(window, 'get', get);

setVal(window, 'exec', exec);

setVal(window, 'restorePage', router.restorePage);

setVal(window, 'navToPage', router.navToPage);
