# Projeto Inicial de Typescript com Webcomponents

### Instalar

npm install

### Executar

npm run dev

Go live com o plugin Live Server

### Adicionar Componente

Todo componente deve extender BaseComp< CompProps > e implementar a função getHTML

É opcional implementar a função getStyle

**Exemplo de componente**

```JS
export class MeuComp extends BaseComp<CompProps> {
    getHTML() {
        return '';
    }
}
```

Todo componente deve ser registrado dessa forma:
```JS
customElements.define('nome-comp', ClassComp);
```
Obs: a tag do componente deve ter um traço no nome.

**Declarando Propriedades**

```JS
export interface MeuCompProps extends CompProps {
    prop1: string,
    prop2: number
}

export class MeuComp extends BaseComp<MeuCompProps> { }
```

Caso não queira validar as propriedades pelo Typescript:
```JS
export class MeuComp extends BaseComp<any> { }
```

**Import dos Componentes**

Todo componente deve ter uma lista declarada com as class dos sub componentes importados que utiliza.

### Adicionar Página

Crie as páginas em src/pages (opcional)

Registre páginas em src/shared/**routes.ts**

Adicione na lista **pages** com o seguinte formato:
```JS
{name: 'nome-da-tag', path: 'nome-na-url', label: 'Nome visível para o usuário (navbar)'}
```

Também adicione a class do componente na lista **pageClasses**.

### Navegar Para uma Página

No HTML
```HTML
<button onclick="navToPage('path')"> Navegar </button>
```

No Typescript
```JS
routes.navToPage('path');
```

### Funcionalidades dos Componentes

Renderiza o componente novamente
```JS
this.render();
```
Obs: os componentes não renderizam automaticamente quando ocorre qualquer mudança.
Apenas renderizam novamente chamando a função render.

**print**

Cria uma variável para escrever algo no HTML (para não sujar o HTML com JS)
```JS
this.print('paragrafo1', obj.visivel ? `<p>${obj.txt}</p>` : '');
```
Referencia no HTML com #
```HTML
<div> #paragrafo1 </div>
```

**ref**

Cria uma variável para referenciar algo no HTML
```JS
this.ref('props1', {var1: 'var1', var2: 2});
this.ref('changeTxt1', valorEvento => obj.txt1 = valorEvento);
```
Referencia no HTML com $
```HTML
<sub-comp props="$props1"></sub-comp>

<input onchange="exec($changeTxt1, event.target.value)">
```

**ref** é essencial para passar objetos via parâmetro e para executar funções no HTML.

**exec**

Executa caso a variável seja uma função, repassando para a função o segundo argumento de exec.

**props**

O objeto referenciado **$props1** é passado para o sub componente.

Este objeto pode ser acessado dentro do sub componente: **this.props**

Ao passar um objeto na props de um sub componente, o componente pai tem acesso a função render do filho através do mesmo objeto que foi passado: **props.render()**

Caso seja necessário renderizar novamente o componente filho ao alterar suas props, use esta função.

Eis um exemplo:

```JS
let propsSubComp = this.ref('propsSubComp', {prop1: '1', prop2: 2});

let txtChange = this.ref('txtChange', (evtValue: string) => {
    propsSubComp.prop1 = evtValue;
    propsSubComp.render();
});
```
```HTML
return `
    <input onchange="exec($txtChange, event.target.value)">
    <sub-comp props="$propsSubComp"></sub-comp>
`;
```

Também é possível adicionar qualquer função do componente ao seu props, para que seja chamada de outro componente.

### CSS Global

arquivo src/shared/global-styles.ts

o CSS da função globalStyles é adicionado a todos componentes.

### Eventos da Aplicação

**Registre um evento** para ser chamado em outro local
```JS
appEvents.add('nomeEvento', (prop: any) => {});
```

Se estiver registrando um evento em um componente:
```JS
connectedCallback() {
    super.connectedCallback();
    this.addEvent('nomeEvento', (prop: any) => {});
}
```
Sempre adicione eventos usando a função addEvent, para que sejam removidos quando o componente sair da tela.

**connectedCallback** 
É uma função padrão de Webcomponent.
É executado quando o componente é adicionado na página.

Ao usar este callback, chame a função original **super.connectedCallback()**, pois o **BaseComp** o utiliza.

Não adicione eventos no contrutor, para evitar duplicidade, pois o construtor pode ser executado mais de uma vez.

**disconnectedCallback** é o oposto.
É executado quando o componente é retirado da página.

Ao usar este callback, chame a função original **super.disconnectedCallback()**, pois o **BaseComp** o utiliza.


**Execute um evento**
```JS
appEvents.exec('nomeEvento', propOpcional);
```

**navToPage**

Este evento é chamado ao trocar de página

**callEvt**

Execute eventos diretamente do HTML

```HTML
<button onclick="callEvt('eventName')">Click me</button>
```

### Subrotas

Rotas são processadas pelo RouterComp.

É possível configurar quantos routers forem necessários, de forma aninhada ou paralela.

Propriedades do RouterComp:

```JS
{ // RouterProps
    pages: [{name: 'nome-da-tag', path: 'nome-na-url', label: 'Nome visível para o usuário'}],
    defaultPath: 'Path padrão (primeira renderização)',
    pathParam: 'Nome do parâmetro do path na URL',
    eventName: 'Chave do evento (usado em appEvents)'
}
```

Obs: pathParam e eventName devem ser únicos para cada router.

**Como Navegar**

No HTML
```HTML
<button onclick="callEvt('eventName', 'path')"></button>
```

No Typescript
```JS
appEvents.exec('eventName', 'path');
```
