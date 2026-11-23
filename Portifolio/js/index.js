/* =====================================
   MENU MOBILE
===================================== */

const menuBtn = document.getElementById("menu-btn");
const menu = document.getElementById("menu");

function fecharMenu() {
    menu.classList.remove("menu-aberto");
    menuBtn.classList.remove("aberto");
    menuBtn.setAttribute("aria-expanded", "false");
    menuBtn.setAttribute("aria-label", "Abrir menu");
    document.body.classList.remove("menu-ativo");
}

if (menuBtn && menu) {

    // Abre ou fecha o menu ao clicar no botão
    menuBtn.addEventListener("click", function () {
        const aberto = menu.classList.toggle("menu-aberto");

        menuBtn.classList.toggle("aberto", aberto);
        menuBtn.setAttribute("aria-expanded", aberto);
        menuBtn.setAttribute("aria-label", aberto ? "Fechar menu" : "Abrir menu");
        document.body.classList.toggle("menu-ativo", aberto);
    });

    // Fecha o menu ao clicar em um link
    menu.querySelectorAll("a").forEach(function (link) {
        link.addEventListener("click", fecharMenu);
    });

    // Fecha com a tecla Esc
    document.addEventListener("keydown", function (e) {
        if (e.key === "Escape") fecharMenu();
    });

    // Se a tela crescer (ex.: girar o celular), fecha o menu
    window.matchMedia("(min-width: 768px)").addEventListener("change", fecharMenu);
}


/* =====================================
   LINK ATIVO NO MENU CONFORME A ROLAGEM
===================================== */

const links = document.querySelectorAll("#menu a");
const secoes = document.querySelectorAll("main section");

if ("IntersectionObserver" in window) {

    const observador = new IntersectionObserver(function (entradas) {
        entradas.forEach(function (entrada) {
            if (entrada.isIntersecting) {
                links.forEach(function (link) {
                    link.classList.toggle(
                        "ativo",
                        link.getAttribute("href") === "#" + entrada.target.id
                    );
                });
            }
        });
    }, { rootMargin: "-45% 0px -50% 0px" });

    secoes.forEach(function (secao) {
        observador.observe(secao);
    });
}


/* =====================================
   EFEITO DE DIGITAÇÃO
===================================== */

const textoAnimado = document.getElementById("texto-animado");

const palavras = [
    "tecnologia.",
    "programação.",
    "desenvolvimento Full Stack.",
    "Vibecoding."
];

let palavraAtual = 0;
let letraAtual = 0;
let apagando = false;

function digitar() {

    const palavra = palavras[palavraAtual];

    if (!apagando) {

        letraAtual++;
        textoAnimado.textContent = palavra.substring(0, letraAtual);

        if (letraAtual === palavra.length) {
            apagando = true;
            setTimeout(digitar, 1500);
            return;
        }

    } else {

        letraAtual--;
        textoAnimado.textContent = palavra.substring(0, letraAtual);

        if (letraAtual === 0) {
            apagando = false;
            palavraAtual = (palavraAtual + 1) % palavras.length;
        }
    }

    setTimeout(digitar, apagando ? 50 : 100);
}

if (textoAnimado) {
    digitar();
}


/* =====================================
   BOTÃO VOLTAR AO TOPO
===================================== */

const botaoTopo = document.getElementById("voltar-topo");

if (botaoTopo) {

    window.addEventListener("scroll", function () {
        botaoTopo.classList.toggle("visivel", window.scrollY > 300);
    }, { passive: true });

    botaoTopo.addEventListener("click", function () {
        window.scrollTo({ top: 0, behavior: "smooth" });
    });
}


/* =====================================
   ANO AUTOMÁTICO NO RODAPÉ
===================================== */

const ano = document.getElementById("ano");

if (ano) {
    ano.textContent = new Date().getFullYear();
}
