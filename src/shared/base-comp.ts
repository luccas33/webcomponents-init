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

export class BaseComp extends HTMLElement {
    shadow;
    props;
    objs: {name: string, id: number}[] = [];
    outputs: {name: string, value: string}[] = [];

    constructor() {
        super();
        this.shadow = this.attachShadow({mode: 'closed'});
        let props = this.getAttribute('props');
        this.props = props ? get(Number.parseInt(props)) || {} : {};
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
        let css = this.getStyle();
        css = css == '' ? '' : `<style>${css}</style>`;
        let html = `${css} ${this.getHTML()}`;
        this.outputs.forEach(output => {
            let name = '#' + output.name;
            html = html.replace(name, output.value);
        });
        this.objs.forEach(obj => {
            let name = '$' + obj.name;
            html = html.replace(name, obj.id + '');
        });
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
    }

    print(name: string, value: string) {
        this.outputs.push({name, value});
    }
}
