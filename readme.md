# Projeto Inicial de Typescript com Webcomponents

### Instalar

npm install

### Executar

npm run dev

Go live com o plugin Live Server no arquivo index.html

### Adicionar Página

Crie as páginas em src/pages (opcional)

Registre páginas em src/shared/router-comp.ts

Adicione na lista pages com o seguinte formato:
```JS
{name: 'nome-da-tag', path: 'nome-na-url', label: 'Nome visível para o usuário (navbar)'}
```

Também adicione a class do componente na lista components.

### Adicionar Componente

Todo componente deve extender BaseComp e implementar a função getHTML

É opcional implementar a função getStyle

Todo componente deve ser registrado dessa forma:
```JS
customElements.define('nome-comp', ClassComp);
```
Obs: a tag do componente deve ter um traço no nome.

### Navegar Para uma Página

No HTML
```HTML
<button onclick="navToPage('path')"> Navegar </button>
```

No Typescript
```JS
router.navToPage('path');
```

### Funcionalidades dos Componentes

Renderiza o componente novamente
```JS
this.render();
```
Obs: os componentes não renderizam automaticamente quando ocorre qualquer mudança.

Apenas renderizam novamente chamando a função render.

Cria uma variável para escrever algo no HTML
```JS
this.print('paragrafo1', obj.visivel ? `<p>${obj.txt}</p>` : '');
```
Referencia no HTML com #
```HTML
<div> #paragrafo1 </div>
```

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
**exec**

Executa caso a variável seja uma função, repassando para a função o segundo argumento de exec.

**props**

O objeto referenciado $props1 é passado para o sub componente.

Este objeto pode ser acessado dentro do sub componente: **this.props**

Ao passar um objeto na props de um sub componente, o componente pai tem acesso a função render do filho através do mesmo objeto que foi passado: **props.render()**

Caso seja necessário renderizar novamente o componente filho ao alterar suas props, use esta função.

### CSS Global

arquivo src/shared/global-styles.ts

o CSS da função globalStyles é adicionado a todos componentes.

### Eventos da Aplicação

Registre um evento para ser chamado em outro local
```JS
appEvents.add('nomeEvento', (prop: any) => {});
```

Execute um evento
```JS
appEvents.exec('nomeEvento', propOpcional);
```

**navToPage**

Este evento é chamado ao trocar de página
