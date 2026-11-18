const contato = {
  email: "mmig795@gmail.com",
  linkedin: "https://www.linkedin.com/in/miguel-bastos-pessoa-569130440?utm_source=share_via&utm_content=profile&utm_medium=member_android",
  github: "",
  instagram: "https://www.instagram.com/temp_migas?knvt=bG51Z2RhdHlrb2Rv",
};

const menu = document.querySelector("#menu");
const botaoMenu = document.querySelector("#menu-botao");
const linksMenu = [...menu.querySelectorAll("a")];
const telaGrande = matchMedia("(min-width: 54rem)");
const movimentoReduzido = matchMedia("(prefers-reduced-motion: reduce)");

function atualizarMenu(aberto = false) {
  botaoMenu.hidden = telaGrande.matches;
  menu.hidden = !telaGrande.matches && !aberto;
  botaoMenu.setAttribute("aria-expanded", String(!telaGrande.matches && aberto));
}

atualizarMenu();
telaGrande.addEventListener("change", () => atualizarMenu());

botaoMenu.addEventListener("click", () => {
  const aberto = botaoMenu.getAttribute("aria-expanded") === "true";
  atualizarMenu(!aberto);
});

menu.addEventListener("click", (evento) => {
  const link = evento.target.closest("a");
  if (!link || telaGrande.matches) return;

  atualizarMenu();
  const destino = document.getElementById(link.hash.slice(1));
  destino.tabIndex = -1;
  destino.focus({ preventScroll: true });
});

document.querySelector(".topo").addEventListener("keydown", (evento) => {
  if (evento.key === "Escape" && botaoMenu.getAttribute("aria-expanded") === "true") {
    atualizarMenu();
    botaoMenu.focus();
  }
});

const filtros = document.querySelector(".filtros");
const botoesFiltro = [...filtros.querySelectorAll("button")];
const categorias = [...document.querySelectorAll("[data-categoria]")];

filtros.hidden = false;
filtros.addEventListener("click", (evento) => {
  const escolhido = evento.target.closest("[data-filtro]");
  if (!escolhido) return;

  const categoria = escolhido.dataset.filtro;
  for (const botao of botoesFiltro) {
    botao.setAttribute("aria-pressed", String(botao === escolhido));
  }
  for (const bloco of categorias) {
    bloco.hidden = categoria !== "todas" && bloco.dataset.categoria !== categoria;
  }
});

const secoes = [...document.querySelectorAll("main section")];
let atualizacaoPendente = false;

function destacarSecao() {
  const referencia = window.innerHeight * 0.35;
  let atual = secoes[0];

  for (const secao of secoes) {
    if (secao.getBoundingClientRect().top > referencia) break;
    atual = secao;
  }

  const chegouAoFim =
    window.scrollY > 0 &&
    Math.ceil(window.scrollY + window.innerHeight) >=
      document.documentElement.scrollHeight - 2;

  if (chegouAoFim) atual = secoes.at(-1);

  for (const secao of secoes) {
    secao.classList.toggle("ativo", secao === atual);
  }
  for (const link of linksMenu) {
    if (link.hash === "#" + atual.id) {
      link.setAttribute("aria-current", "location");
    } else {
      link.removeAttribute("aria-current");
    }
  }

  atualizacaoPendente = false;
}

function agendarDestaque() {
  if (atualizacaoPendente) return;
  atualizacaoPendente = true;
  requestAnimationFrame(destacarSecao);
}

window.addEventListener("scroll", agendarDestaque, { passive: true });
window.addEventListener("resize", agendarDestaque);
window.addEventListener("load", agendarDestaque);
destacarSecao();

if ("IntersectionObserver" in window && !movimentoReduzido.matches) {
  const observador = new IntersectionObserver((entradas) => {
    for (const entrada of entradas) {
      if (!entrada.isIntersecting) continue;
      entrada.target.classList.add("entrou");
      observador.unobserve(entrada.target);
    }
  });

  secoes.slice(1).forEach((secao) => observador.observe(secao));
}

const email = contato.email.trim();
const emailValido = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
const perfis = document.querySelector("#perfis");
const aviso = document.querySelector("#aviso-contato");
const formulario = document.querySelector("#formulario");
const statusContato = document.querySelector("#status-contato");

function adicionarLink(texto, destino) {
  const item = document.createElement("li");
  const link = document.createElement("a");
  link.textContent = texto + " ↗";
  link.href = destino;
  item.append(link);
  perfis.append(item);
  perfis.hidden = false;
}

for (const [nome, endereco] of [
  ["GitHub", contato.github],
]) {
  const link = endereco.trim();
  if (/^https:\/\/[^\s]+$/i.test(link)) {
    adicionarLink(nome, link);
  }
}

if (emailValido) {
  formulario.hidden = false;
} else if (!perfis.hidden) {
  aviso.textContent = "Entre em contato pelos perfis disponíveis.";
}

const campoNome = formulario.elements.namedItem("nome");
const campoMensagem = formulario.elements.namedItem("mensagem");

for (const [campo, erro] of [
  [campoNome, "Informe seu nome."],
  [campoMensagem, "Escreva uma mensagem."],
]) {
  campo.addEventListener("input", () => {
    campo.setCustomValidity(campo.value && !campo.value.trim() ? erro : "");
  });
}

formulario.addEventListener("submit", (evento) => {
  evento.preventDefault();
  if (!emailValido) return;

  const remetente = formulario.elements.namedItem("email").value.trim();
  const assunto = encodeURIComponent("Contato pelo portfólio");
  const corpo = encodeURIComponent(
    `Nome: ${campoNome.value.trim()}\r\nE-mail: ${remetente}\r\n\r\n${campoMensagem.value.trim()}`
  );

  statusContato.textContent = "Revise a mensagem no seu aplicativo de e-mail e envie por lá.";
  window.location.href = `mailto:${email}?subject=${assunto}&body=${corpo}`;
});

document.querySelector("#ano").textContent = new Date().getFullYear();
// Busca por texto combinada com o filtro por categoria.
(() => {
  const filtros = document.querySelector("#competencias :is(.filters, .filtros)");
  const normalizar = (texto) => texto.normalize("NFD").replace(/\p{M}/gu, "").toLowerCase();
  const grupos = [...document.querySelectorAll("#competencias :is([data-category], [data-categoria])")]
    .map((grupo) => ({
      elemento: grupo,
      categoria: grupo.dataset.category ?? grupo.dataset.categoria,
      itens: [...grupo.querySelectorAll("li")].map((item) => ({
        elemento: item,
        texto: normalizar(item.textContent),
      })),
    }));

  filtros.insertAdjacentHTML("beforebegin", `
    <div class="busca-competencias">
      <label for="busca-competencia">Buscar competência</label>
      <div class="busca-controles">
        <input id="busca-competencia" type="search" placeholder="Ex.: Python ou análise" autocomplete="off">
        <button class="controle-portfolio" id="limpar-busca" type="button" hidden>Limpar</button>
      </div>
    </div>
  `);
  filtros.insertAdjacentHTML("afterend", `
    <p class="resultado-competencias" id="resultado-competencias" role="status"></p>
  `);

  const busca = document.querySelector("#busca-competencia");
  const limpar = document.querySelector("#limpar-busca");
  const resultado = document.querySelector("#resultado-competencias");

  function atualizarBusca() {
    const selecionado = filtros.querySelector('[aria-pressed="true"]');
    const categoria = selecionado.dataset.filter ?? selecionado.dataset.filtro;
    const termos = normalizar(busca.value).trim().split(/\s+/).filter(Boolean);
    let total = 0;

    for (const grupo of grupos) {
      const categoriaVisivel = categoria === "todas" || categoria === grupo.categoria;
      let visiveis = 0;

      for (const item of grupo.itens) {
        const corresponde = categoriaVisivel && termos.every((termo) => item.texto.includes(termo));
        item.elemento.hidden = !corresponde;
        visiveis += Number(corresponde);
      }

      grupo.elemento.hidden = visiveis === 0;
      total += visiveis;
    }

    limpar.hidden = busca.value === "";
    resultado.textContent = total === 0
      ? "Nenhuma competência encontrada. Tente outro termo ou categoria."
      : total + (total === 1 ? " competência encontrada" : " competências encontradas");
  }

  busca.addEventListener("input", atualizarBusca);
  filtros.addEventListener("click", atualizarBusca);

  limpar.addEventListener("click", () => {
    busca.value = "";
    busca.focus();
    atualizarBusca();
  });

  atualizarBusca();
})();

// Estudo de caso com detalhes sobre as três tecnologias do projeto.
(() => {
  const projeto = document.querySelector("#projetos article");

  projeto.insertAdjacentHTML("beforeend", `
    <button class="controle-portfolio abrir-estudo" type="button" aria-haspopup="dialog">
      Explorar o projeto
    </button>
  `);

  document.body.insertAdjacentHTML("beforeend", `
    <dialog class="estudo-projeto" aria-labelledby="titulo-estudo">
      <header>
        <h2 id="titulo-estudo">Como construí este portfólio</h2>
        <form method="dialog">
          <button class="controle-portfolio" type="submit" autofocus>Fechar</button>
        </form>
      </header>
      <p>O objetivo era apresentar minha formação e minha experiência em uma página que funcionasse bem no celular e no computador.</p>
      <details name="tecnologias-projeto" open>
        <summary>HTML · Estrutura da página</summary>
        <p>Organizei o conteúdo em seções semânticas com âncoras, títulos e campos de formulário com rótulos.</p>
      </details>
      <details name="tecnologias-projeto">
        <summary>CSS · Layout e identidade visual</summary>
        <p>Usei Grid e Flexbox para adaptar o layout à tela. A paleta e os traços em SVG dão identidade visual à página.</p>
      </details>
      <details name="tecnologias-projeto">
        <summary>JavaScript · Interações</summary>
        <p>Combinei a busca por texto com o filtro por categoria e implementei um menu móvel operável pelo teclado.</p>
      </details>
    </dialog>
  `);

  const abrir = projeto.querySelector(".abrir-estudo");
  const estudo = document.querySelector(".estudo-projeto");

  abrir.addEventListener("click", () => {
    abrir.focus({ preventScroll: true });
    estudo.showModal();
  });
})();

// Experiências e formação em uma linha do tempo expansível.
document.querySelectorAll("#trajetoria :is(.timeline, .linha-do-tempo) li").forEach((item, indice) => {
  const conteudo = item.querySelector("div");
  const titulo = conteudo.querySelector("h3");
  const detalhe = document.createElement("details");
  const resumo = document.createElement("summary");

  detalhe.name = "itens-trajetoria";
  detalhe.open = indice === 0;
  resumo.textContent = titulo.textContent;

  titulo.remove();
  detalhe.append(resumo, ...conteudo.childNodes);
  conteudo.replaceWith(detalhe);
});
