// Preencha com seus dados reais. Use links completos, começando com https://.
const contato = {
  email: "",
  linkedin: "",
  github: "",
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
  ["LinkedIn", contato.linkedin],
  ["GitHub", contato.github],
]) {
  const link = endereco.trim();
  if (/^https:\/\/[^\s]+$/i.test(link)) {
    adicionarLink(nome, link);
  }
}

if (emailValido) {
  adicionarLink("E-mail", "mailto:" + email);
  aviso.hidden = true;
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