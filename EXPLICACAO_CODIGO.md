# Explicacao dos arquivos do portfolio

Este documento explica os arquivos principais do projeto:

- [index.html](./index.html): estrutura e conteudo da pagina.
- [style.css](./style.css): cores, fontes, espacamento, layout e responsividade.
- [node.js](./node.js): interacoes, filtros, busca, menu e formulario.
- [README.md](./README.md): descricao resumida do projeto.

O nome [node.js](./node.js) pode sugerir que o arquivo faz parte de um servidor Node.js, mas ele atualmente funciona como JavaScript no navegador. As paginas web executam JavaScript por meio da tag `<script>`, e nao necessariamente por meio do Node.js.

## Como os arquivos se relacionam

1. O navegador abre [index.html](./index.html).
2. Dentro do `<head>`, o HTML carrega o Google Fonts e [style.css](./style.css).
3. O arquivo HTML cria os elementos que o usuario visualiza.
4. O CSS determina a aparencia desses elementos.
5. A linha `<script src="script.js" defer></script>` tenta carregar o JavaScript.

### Observacao importante

O projeto possui [node.js](./node.js), mas o HTML procura por `script.js`. Como nao existe um arquivo chamado `script.js`, o JavaScript nao sera executado pela configuracao atual.

Para carregar o arquivo existente, a linha do HTML deve ser alterada para:

```html
<script src="node.js" defer></script>
```

Tambem seria mais claro renomear `node.js` para `script.js`.

# Explicacao de index.html

## Cabecalho do documento

```html
<!doctype html>
<html lang="pt-BR">
```

- `<!doctype html>` informa ao navegador que o documento usa HTML moderno.
- `<html lang="pt-BR">` indica que o idioma principal da pagina e portugues do Brasil.

```html
<meta charset="utf-8">
```

Define a codificacao dos caracteres. Isso permite exibir corretamente letras e acentos, como em "Miguel", "Competencias" e "Trajetoria".

```html
<meta name="viewport" content="width=device-width, initial-scale=1">
```

Faz a largura da pagina acompanhar o tamanho da tela do celular, tablet ou computador.

```html
<meta name="description" content="...">
<title>Miguel Bastos Pessoa | Portfolio</title>
```

O primeiro elemento fornece uma descricao para buscadores e redes sociais. O segundo define o texto exibido na aba do navegador.

O documento tambem conecta fontes externas do Google Fonts e arquivos locais:

```html
<link rel="stylesheet" href="style.css">
<script src="script.js" defer></script>
```

`defer` faz o navegador aguardar o carregamento completo do HTML antes de executar o JavaScript.

## Link de acessibilidade

```html
<a class="skip" href="#conteudo">Pular para o conteudo</a>
```

Esse link permite que pessoas que usam teclado pulem diretamente para o conteudo principal. O CSS o mantem fora da tela ate que receba foco.

## Cabecalho e navegacao

```html
<header class="topo">
```

O elemento `<header>` representa o cabecalho da pagina. A classe `.topo` recebe o estilo visual definido no CSS.

```html
<a class="marca" href="#inicio">
  <span aria-hidden="true">MBP</span>
  <small>Portfolio<br>Gama, DF</small>
</a>
```

Cria o logotipo textual. `MBP` sao as iniciais de Miguel Bastos Pessoa.

O atributo `aria-hidden="true"` informa tecnologias assistivas que esse texto visual nao precisa ser lido novamente.

```html
<button id="menu-botao" ... hidden>
```

Cria o botao usado para abrir e fechar o menu em telas pequenas. `aria-controls="menu"` relaciona o botao ao menu. `aria-expanded="false"` informa se o menu esta fechado.

```html
<nav id="menu" aria-label="Navegacao principal">
```

Cria a navegacao principal. Os links apontam para as secoes da pagina por meio de fragmentos, como `#sobre` e `#projetos`.

## Conteudo principal

```html
<main id="conteudo">
```

O elemento `<main>` representa o conteudo principal da pagina.

## Secao de abertura

```html
<section class="escuro abertura" id="inicio">
```

Representa a secao inicial. `escuro` ativa o fundo verde e `abertura` identifica estilos especificos dessa area.

O `<h1>` possui a palavra "Pessoa" dentro de `<em>` para receber uma cor ou apresentacao diferente no CSS.

O elemento `<svg>` cria manualmente o desenho de uma quadra. Ele e composto por:

- `<defs>` e `<pattern>` para criar uma grade de fundo.
- `<rect>` para o contorno externo.
- `<path>` para linhas e arcos da quadra.
- `<circle>` para circulos.
- `<text>` para mostrar as iniciais MBP.

Como o desenho nao tem significado informativo, ele recebe `aria-hidden="true"`.

## Secao Sobre

```html
<h2 id="titulo-sobre"><span aria-hidden="true">01</span> Sobre</h2>
```

Cria um titulo de nivel 2 com um indice visual. As letras devem ser lidas como titulo "Sobre", sem o numero "01".

```html
<dl class="placar">
```

`<dl>` representa uma lista de termos e descricoes. Aqui, cada par usa:

- `<dt>` para o nome da informacao.
- `<dd>` para o valor correspondente.

## Secao Competencias

Cada categoria esta dentro de um `<article>` com um atributo personalizado:

```html
<article data-categoria="tecnologia">
```

O atributo `data-categoria` permite que JavaScript identifique a categoria. O mesmo ocorre com `data-categoria="administracao"`.

Cada competencia esta em uma lista `<ul>`:

```html
<li>Python</li>
```

Os botoes de filtro recebem `data-filtro` e `aria-pressed`:

- `data-filtro` informa qual categoria o botao representa.
- `aria-pressed="true"` indica que o botao esta ativo.
- `aria-pressed="false"` indica que esta inativo.

## Secao Trajetoria

```html
<ol class="linha-do-tempo">
```

Cria uma lista ordenada. Porem, o JavaScript transforma cada item em um elemento `<details>` expansivel.

O conteudo antes da transformacao contem:

- um `<span class="rotulo">` com o periodo e o tipo.
- um `<div>` com titulo e descricao.

## Secao Projetos

Cria um artigo que apresenta o portfolio pessoal. A lista `tecnologias` informa HTML, CSS e JavaScript.

Ao final, o JavaScript cria um botao chamado "Explorar o projeto" e abre uma caixa de dialogo quando ele e acionado.

## Secao Contato

O HTML possui dois blocos importantes:

```html
<p id="aviso-contato">Meu e-mail e meus perfis serao adicionados em breve.</p>
```

Essa mensagem e exibida enquanto nao houver um e-mail valido configurado.

```html
<form id="formulario" hidden>
```

O formulario fica oculto enquanto o objeto `contato.email` estiver vazio.

Cada campo usa um nome, um identificador e atributos HTML:

- `autocomplete="name"` ajuda o navegador a preencher o nome.
- `type="email"` ativa validacao basica de e-mail.
- `required` impede o envio sem preenchimento.
- `maxlength` limita a quantidade de caracteres.
- `<label for="...">` associa o texto ao campo correspondente.

`role="status"` indica que a mensagem de resultado sera anunciada por tecnologias assistivas.

## Rodape

O rodape exibe o ano atual, que e atualizado pelo JavaScript:

```html
<span id="ano">2026</span>
```

O link "Voltar ao inicio" leva novamente ao elemento `#inicio`.

# Explicacao de style.css

## Variaveis CSS

```css
:root {
  --quadra: #0f4d2e;
  --giz: #f3efe4;
}
```

`:root` representa o elemento mais alto da pagina. Variaveis criadas nele podem ser usadas por todo o CSS.

Exemplos:

- `--quadra`: verde principal.
- `--laranja`: cor de destaque.
- `--giz`: cor clara usada em textos e fundos.
- `--titulo`: fonte para titulos.
- `--texto`: fonte para textos comuns.
- `--mono`: fonte monoespacada para rotulos pequenos.

Usar variaveis evita repeticao e facilita alterar toda a identidade visual depois.

## Reset e configuracoes gerais

```css
* { box-sizing: border-box; }
```

Faz largura e altura incluirem padding e borda. Isso evita que elementos ultrapassem tamanhos calculados.

```css
[hidden] { display: none !important; }
```

Garante que elementos com o atributo `hidden` fiquem realmente ocultos.

O CSS tambem remove margens externas padrao de alguns elementos e define fontes, cores e altura de linha para o corpo da pagina.

## Estados de foco

```css
a:focus-visible,
button:focus-visible,
input:focus-visible,
textarea:focus-visible {
  outline: 3px solid currentColor;
}
```

Quando links, botoes ou campos sao acionados pelo teclado, aparece uma borda de foco. Isso ajuda na navegacao acessivel.

## Container

```css
.container {
  width: min(100% - 2rem, 72rem);
  margin-inline: auto;
}
```

Centraliza o conteudo e limita sua largura maxima a 72rem. A largura usa uma margem total de 2rem em telas menores.

## Menu fixo no topo

```css
.topo {
  position: sticky;
  top: 0;
  z-index: 2;
}
```

Faz o cabecalho continuar visivel durante a rolagem da pagina.

## Layout com Grid

```css
.grade-abertura,
.duas-colunas {
  display: grid;
}
```

Cria grades para organizar textos e elementos lado a lado.

No media query para telas com largura minima de 40rem, as grades recebem duas colunas. Em telas menores, continuam em uma coluna.

## Tipografia responsiva

`clamp()` define um tamanho minimo, um tamanho preferencial e um tamanho maximo.

Exemplo:

```css
h1 {
  font-size: clamp(3.2rem, 9vw, 8rem);
}
```

O titulo cresce conforme a largura da tela, mas nao ultrapassa 8rem nem fica menor que 3.2rem.

## Titulos e secoes

O CSS define:

- margem e padding das secoes.
- linhas inferiores dos titulos.
- cores diferentes para secoes claras e escuras.
- destaque visual do numero das secoes.

`scroll-margin-top: 5rem` evita que um link de ancoragem fique escondido abaixo do cabecalho fixo.

## Botao principal

O botao recebe:

- display flexivel.
- altura minima.
- padding.
- fundo laranja.
- texto escuro.
- efeito de mudanca de cor ao passar o mouse.

A animacao `quique` move o botao verticalmente. Ela nao sera executada quando o usuario preferir movimento reduzido.

## Animacao de entrada

```css
@keyframes entrada {
  from { transform: translateY(12px); opacity: .6; }
}
```

Quando uma secao recebe a classe `.entrou`, o titulo aparece com movimento e transparencia.

## Placar

A classe `.placar` transforma os tres pares termo/valor em uma grade de tres colunas.

O CSS tambem coloca uma borda verde no topo e divide visualmente cada item com uma borda lateral.

## Filtros

Os botoes usam estado visual baseado em `aria-pressed="true"`. Quando ativo, o botao recebe fundo claro e texto escuro.

## Listas e linha do tempo

As regras removem marcadores das listas:

```css
list-style: none;
```

Cada item da linha do tempo usa Grid para posicionar a data e o conteudo em telas maiores.

## Projeto

A classe `.projeto` cria:

- largura maxima.
- margem interna responsiva.
- borda.
- borda superior verde ou laranja.
- fundo verde escuro.

## Formulario

Campos de texto e textarea recebem largura total, padding, borda e cores apropriadas ao tema escuro.

## Rodape

O rodape usa fundo escuro e texto claro. Sua barra pode combinar conteudo e link no mesmo eixo.

## Responsividade

No intervalo inferior a 53.99rem:

- a navegacao passa a ocupar toda a largura.
- o menu pode ser controlado pelo JavaScript.

A partir de 40rem:

- abertura e secoes passam a usar duas colunas.
- a linha do tempo recebe uma coluna para a data e outra para o conteudo.

Em telas menores que 40rem:

- varios elementos ficam em uma unica coluna.

## Preferencia de movimento reduzido

```css
@media (prefers-reduced-motion: reduce)
```

Desliga o movimento suave da pagina e remove animacoes para usuarios que configuraram essa preferencia no sistema.

## Blocos adicionais de estilo

[style.css](./style.css) possui blocos separados para substituir e complementar a identidade visual:

1. Tipografia, espacamento e cores.
2. Busca de competencias, estudo de caso e trajetoria.

O primeiro bloco altera fontes dos titulos para Arquivo, deixa secoes claras como competencias e projetos, e altera o fundo do projeto.

O segundo bloco estiliza:

- botoes de controle.
- campo de busca.
- status de quantidade encontrada.
- caixa de dialogo `.estudo-projeto`.
- elemento `dialog::backdrop`.
- elementos `<details>` e `<summary>`.
- responsividade da ilustracao da quadra.

# Explicacao de node.js

## Objeto de contato

```javascript
const contato = {
  email: "",
  linkedin: "",
  github: ""
};
```

Guarda as informacoes de contato em um unico objeto.

- Quando `email` estiver preenchido, o link de e-mail e o formulario podem aparecer.
- Quando `linkedin` for uma URL valida do LinkedIn, o perfil aparece.
- Quando `github` for uma URL valida do GitHub, o perfil aparece.

## Localizando elementos

```javascript
document.querySelector("#menu");
```

Busca no HTML o primeiro elemento correspondente ao seletor informado.

Exemplos de seletores:

- `#menu` busca o elemento com `id="menu"`.
- `.topo` busca o elemento com `class="topo"`.
- `[data-filtro]` busca elementos com esse atributo.
- `main section` busca todas as secoes dentro de `<main>`.

O operador `...` transforma uma colecao de elementos em um array:

```javascript
const linksMenu = [...menu.querySelectorAll("a")];
```

## Detectando tamanhos de tela

```javascript
const telaGrande = matchMedia("(min-width: 54rem)");
```

Cria uma consulta que informa se a tela esta em largura minima.

```javascript
const movimentoReduzido = matchMedia("(prefers-reduced-motion: reduce)");
```

Detecta quando o sistema esta configurado para reduzir movimento.

## Menu responsivo

A funcao `atualizarMenu(aberto = false)` recebe um estado opcional:

- `aberto = false` e usado quando nenhum valor e informado.
- `botaoMenu.hidden` decide se o botao do menu aparece.
- `menu.hidden` decide se o menu esta oculto.
- `aria-expanded` informa o estado atual.

O botao troca o menu entre aberto e fechado.

Quando um link do menu mobile e clicado:

1. O JavaScript evita a atualizacao normal apenas em telas menores.
2. Fecha o menu.
3. Localiza o destino pelo ID informado no `href`.
4. Move o foco de teclado para a secao correspondente.

A tecla `Escape` fecha o menu e devolve o foco ao botao.

## Filtro de categorias

O JavaScript encontra os botoes e os artigos de categoria:

```javascript
const categorias = [...document.querySelectorAll("[data-categoria]")];
```

Ao clicar em um botao:

1. Le o valor de `data-filtro`.
2. Atualiza `aria-pressed` em todos os botoes.
3. Percorre os artigos.
4. Oculta uma categoria se ela nao corresponde ao filtro.

O filtro "Todas" deixa todos os artigos visiveis.

## Destaque da secao atual

O programa observa a posicao das secoes durante a rolagem.

```javascript
const referencia = window.innerHeight * 0.35;
```

Define uma linha de referencia a 35% da altura da tela.

Para cada secao:

- se ela ainda nao passou da referencia, interrompe a verificacao;
- caso contrario, considera essa secao como atual.

A condicao `chegouAoFim` corrige o destaque quando o usuario chega ao rodape.

Depois, o JavaScript:

- adiciona `.ativo` na secao atual;
- remove `.ativo` das outras;
- atualiza `aria-current="location"` no link correspondente.

`requestAnimationFrame` combina a atualizacao com o momento correto de renderizacao do navegador.

`atualizacaoPendente` evita varias atualizacoes desnecessarias entre um quadro e outro.

## Animacao ao entrar na tela

Quando suportado e o usuario nao prefere movimento reduzido:

- `IntersectionObserver` observa as secoes.
- Ao identificar que uma secao entrou na tela, adiciona `.entrou`.
- Depois, deixa de observar essa secao.

As classes `.entrou` ativam a animacao CSS correspondente.

## Links e formulario de contato

O JavaScript primeiro remove espacos no inicio e no fim do e-mail:

```javascript
const email = contato.email.trim();
```

Depois testa um formato basico com expressao regular.

Os perfis LinkedIn e GitHub sao incluidos apenas se comecarem com `https://`.

A funcao `adicionarLink(texto, destino)`:

1. cria um `<li>`;
2. cria um `<a>`;
3. define o texto e o destino;
4. adiciona o link na lista.

Se existir um e-mail valido:

- o link de e-mail e criado;
- o aviso escondido;
- o formulario mostrado.

Se houver apenas perfis sociais:

- o aviso muda para "Entre em contato pelos perfis disponiveis."

## Validacao personalizada dos campos

Os campos nome e mensagem usam:

```javascript
campo.setCustomValidity(...)
```

Isso impede o envio quando o campo possui apenas espacos vazios.

`namedItem("nome")` busca um campo pelo atributo `name`, nao pelo `id`.

## Envio para o aplicativo de e-mail

Ao enviar o formulario:

1. a pagina evita o envio HTTP normal;
2. confirma novamente que existe e-mail valido;
3. le nome, e-mail remetente e mensagem;
4. codifica esses valores com `encodeURIComponent`;
5. monta assunto e corpo da mensagem;
6. atualiza o texto de status;
7. abre o link `mailto:`.

O formato `mailto:` abre o aplicativo de e-mail configurado no dispositivo.

O JavaScript nao envia a mensagem sozinho. O usuario precisa concluir o envio no aplicativo.

## Ano do rodape

```javascript
new Date().getFullYear()
```

Obtem o ano atual e substitui o texto do elemento `#ano`.

## Busca de competencias

Esta parte cria dinamicamente:

- um campo de busca;
- um botao "Limpar";
- uma area de resultado com `role="status"`.

A funcao `normalizar(texto)`:

1. decompõe letras acentuadas com `NFD`;
2. remove marcas de acento com uma expressao Unicode;
3. converte o texto para letras minusculas.

Isso faz a busca encontrar "analise" digitando "analise", "Análise" ou "ANALISE".

Na atualizacao da busca:

1. identifica a categoria ativa.
2. separa os termos digitados em palavras.
3. verifica se todos os termos aparecem em cada item.
4. oculta ou mostra cada competencia.
5. oculta um grupo inteiro se ele nao tiver resultados.
6. atualiza a quantidade encontrada.

O campo atualiza os resultados a cada digitacao. O filtro atualiza os resultados ao ser clicado.

## Estudo de caso em dialogo

O JavaScript cria:

```javascript
<button class="controle-portfolio">Explorar o projeto</button>
```

E uma caixa `<dialog>` contendo titulos e elementos `<details>`.

Ao clicar no botao:

```javascript
estudo.showModal();
```

abre o dialogo no modo modal.

Um formulario com `method="dialog"` permite que o botao "Fechar" finalize o dialogo sem precisar de codigo JavaScript adicional.

`html:has(.estudo-projeto[open])` usado no CSS impede a rolagem da pagina enquanto o modal esta aberto.

## Linha do tempo expansivel

Esta parte procura cada item da linha do tempo e:

1. encontra o elemento `<div>` interno;
2. encontra o titulo `<h3>`;
3. cria um elemento `<details>`;
4. cria um elemento `<summary>`;
5. coloca o titulo antigo dentro do resumo;
6. move a descricao para dentro de `<details>`;
7. abre apenas o primeiro item inicialmente.

O atributo `name="itens-trajetoria"` faz com que navegadores modernos permitam apenas um item desse grupo aberto por vez.

# Fluxo geral da pagina

1. O HTML define todas as secoes.
2. O CSS aplica o tema visual e adapta o layout.
3. O JavaScript ativa o menu responsivo.
4. O JavaScript destaca a secao que esta em foco durante a rolagem.
5. Os botoes filtram as competencias.
6. O campo de busca filtra tambem por texto.
7. O botao do projeto abre o estudo de caso.
8. Os itens da trajetoria tornam-se expansíveis.
9. O ano do rodape e atualizado.

# Termos importantes

- **HTML**: linguagem usada para estruturar conteudo.
- **CSS**: linguagem usada para aparencia e layout.
- **JavaScript**: linguagem usada para interacao e comportamento.
- **DOM**: representacao dos elementos da pagina que o JavaScript pode consultar e alterar.
- **Seletor**: regra usada para encontrar elementos, como `#menu`, `.topo` ou `main section`.
- **Evento**: ocorrencia como clique, digitacao, rolagem ou tecla pressionada.
- **Listener**: funcao que aguarda um evento acontecer.
- **Atributo data**: atributo personalizado usado pelo JavaScript, como `data-filtro`.
- **ARIA**: atributos que fornecem mais informacao sobre acessibilidade e estado.
- **Media query**: condicao CSS usada para aplicar estilos conforme tamanho ou preferencia.
- **Expressao regular**: padrao usado para validar textos, como e-mails e URLs.
- **Detalhes/sumario**: elementos HTML nativos para conteudo expansível.
