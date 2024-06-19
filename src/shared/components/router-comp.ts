import { BaseComp, CompProps } from "../base-comp";

export interface Page {
    name: string, 
    path: string, 
    label: string, 
    active?: boolean,
    props?: any
}

export interface RouterProps extends CompProps {
    pages: Page[],
    defaultPath: string,
    pathParam: string,
    eventName: string
}

export class RouterComp extends BaseComp<RouterProps> {
    connectedCallback() {
        this.addEvent(this.props.eventName, (path: string) => this.navToPage(path));
    }
    
    getHTML(): string {
        let activePage = this.props.pages.find(pg => pg.active);
        let defaultPage = this.props.pages.find(pg => pg.path == this.props.defaultPath);
        let page = activePage || this.getPageFromURL() || defaultPage;
        if (page) {
            page.active = true;
        }
        let name = page?.name || 'not-found';
        if (page && page.props) {
            this.ref('props', page.props);
        }
        return `<${name}${page?.props ? ' props="$props"' : ''}></${name}>`;
    }

    getPageFromURL() {
        let params = new URL(document.location.href).searchParams;
        let path = params.get(this.props.pathParam) || '';
        return this.props.pages.find(pg => pg.path == path);
    }

    navToPage(path: string) {
        path = !path || path.trim() == '' ? this.props.defaultPath : path.trim();
        let page = this.props.pages.find(page => page.path == path);
        if (!page) {
            console.log(`Page ${path} not found`);
            return;
        };
        this.props.pages.forEach(pg => pg.active = false);
        page.active = true;
        this.render();
        let url = new URL(document.location.href);
        url.searchParams.set(this.props.pathParam, path);
        window.history.pushState(null, '', url.toString());
    }

    disconnectedCallback() {
        super.disconnectedCallback();
        let url = new URL(document.location.href);
        url.searchParams.delete(this.props.pathParam);
        window.history.pushState(null, '', url.toString());
    }
}

customElements.define('router-comp', RouterComp);
