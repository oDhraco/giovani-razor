// Selecionamos os elementos do HTML
const menuButton = document.querySelector("#menu-toggle");
const menu = document.querySelector("#menu");

// Controle o estado do menu
function setMenu(aberto) {

    menu.classList.toggle("active", aberto);

    menuButton.setAttribute(
        "aria-expanded", String(aberto)
    );

    menuButton.setAttribute(
        "aria-label",
        aberto ? "Fechar menu" : "Abrir menu"
    );

    menuButton.textContent = aberto ? "x" : "☰";

}

// Abre e fecha o menu
menuButton.addEventListener("click", () => {

    const aberto = menu.classList.contains("active");

    setMenu(!aberto);

});

// Fecha o menu quando um link é clicado
const links = menu.querySelectorAll("a");

links.forEach((link) => {

    link.addEventListener("click", () => {
        setMenu(false);
    });

});

/* ============================= */
/* GALERIA / LIGHTBOX */
/* ============================= */

const galleryItems = document.querySelectorAll(".gallery-item");

const lightbox = document.querySelector("#lightbox");
const lightboxImage = document.querySelector("#lightbox-image");
const lightboxCaption = document.querySelector("#lightbox-caption");
const lightboxClose = document.querySelector("#lightbox-close");

let lastGalleryTrigger = null;


// Abrir imagem
function openLightbox(item) {

    const image = item.querySelector("img");

    lastGalleryTrigger = item;

    lightboxImage.src = image.src;
    lightboxImage.alt = image.alt;

    lightboxCaption.textContent = item.dataset.caption;

    lightbox.classList.add("active");
    lightbox.setAttribute("aria-hidden", "false");

    document.body.style.overflow = "hidden";

    lightboxClose.focus();

}


// Fechar imagem
function closeLightbox() {

    lightbox.classList.remove("active");
    lightbox.setAttribute("aria-hidden", "true");

    lightboxImage.src = "";

    document.body.style.overflow = "";

    if (lastGalleryTrigger) {
        lastGalleryTrigger.focus();
    }

}


// Evento de clique em cada foto
galleryItems.forEach((item) => {

    item.addEventListener("click", () => {
        openLightbox(item);
    });

});


// Botão de fechar
lightboxClose.addEventListener("click", closeLightbox);


// Clique no fundo escuro também fecha
lightbox.addEventListener("click", (event) => {

    if (event.target === lightbox) {
        closeLightbox();
    }

});


// Tecla ESC fecha a imagem
document.addEventListener("keydown", (event) => {

    if (
        event.key === "Escape" &&
        lightbox.classList.contains("active")
    ) {
        closeLightbox();
    }

});


/* ============================= */
/* SCROLL REVEAL */
/* ============================= */

const revealElements = document.querySelectorAll(
    ".section-title, .service-card, .gallery-item, .about-content, .about-visual, .contact"
);

if ("IntersectionObserver" in window) {

    const revealObserver = new IntersectionObserver(
        (entries) => {

            entries.forEach((entry) => {

                if (entry.isIntersecting) {

                    entry.target.classList.remove("reveal-pending");

                    entry.target.classList.add("reveal-visible");

                    revealObserver.unobserve(entry.target);

                }

            });

        },
        {
            threshold: 0.15
        }
    );

        revealElements.forEach((element) => {

        element.classList.add("reveal-pending");

        revealObserver.observe(element);

    });

}