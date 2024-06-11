import { globalStyles } from "./global-styles";

let globalId = 0;
let globalObjects: {id: number, value: any}[] = [];

export function get(id:number) {
    let obj = globalObjects.find(go => go.id == id);
    return obj ? obj.value : null;
}

export function exec(id: number, param: any) {
    let func = get(id);
    if (func && typeof func == 'function') func(param);
}

export interface CompProps {
    render: Function
}

export class BaseComp<P extends CompProps> extends HTMLElement {
    shadow;
    props: P;
    objs: {name: string, id: number}[] = [];
    outputs: {name: string, value: string}[] = [];

    constructor() {
        super();
        this.shadow = this.attachShadow({mode: 'closed'});
        let propsId = this.getAttribute('props');
        let props = propsId ? get(Number.parseInt(propsId)) || {} : {};
        props.render = () => this.render();
        this.props = props;
        this.render();
    }

    getHTML() {
        return '';
    }

    getStyle() {
        return '';
    }

    render() {
        this.clearObjects();
        let html = this.getHTML();

        this.outputs.forEach(output => {
            let name = '#' + output.name;
            html = html.replace(name, output.value);
        });

        this.objs.forEach(obj => {
            let name = '$' + obj.name;
            html = html.replace(name, obj.id + '');
        });

        let globalCss = clearStyle(html, globalStyles());
        html = `<style>${globalCss} \n ${this.getStyle()}</style> \n ${html}`;

        this.shadow.innerHTML = html;
    }

    disconnectedCallback() {
        this.clearObjects();
    }

    clearObjects() {
        let ids = this.objs.map(obj => obj.id);
        this.objs = [];
        this.outputs = [];
        globalObjects = globalObjects.filter(o => !ids.find(id => id == o.id));
    }

    ref(name: string, value: any) {
        let id = ++globalId;
        globalObjects.push({id, value});
        this.objs.push({name, id});
        return value;
    }

    print(name: string, value: string) {
        this.outputs.push({name, value});
        return value;
    }
}

function clearStyle(html: string, style: string) {
    let div = document.createElement('div');
    div.innerHTML = html;

    return style.split('}').map(cls => {
        let clsArr = cls.split('{');
        if (clsArr.length < 2) return {};
        return {selector: clsArr[0], content: clsArr[1]};
    }).filter(cls => cls.selector && div.querySelector(cls.selector.trim()))
        .map(cls => `${cls.selector} { ${cls.content} }`)
        .join('');
}
