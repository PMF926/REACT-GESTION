const header = document.querySelector("[data-header]");
const nav = document.querySelector("#site-nav");
const navToggle = document.querySelector(".nav-toggle");
const contactForm = document.querySelector("[data-contact-form]");
const formStatus = document.querySelector("[data-form-status]");

if (navToggle && nav) {
  const closeNav = () => {
    nav.classList.remove("is-open");
    navToggle.setAttribute("aria-expanded", "false");
  };

  navToggle.addEventListener("click", () => {
    const isOpen = nav.classList.toggle("is-open");
    navToggle.setAttribute("aria-expanded", String(isOpen));
  });

  nav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      closeNav();
    });
  });

  const closeNavFromOutside = (event) => {
    if (!nav.classList.contains("is-open")) {
      return;
    }

    const interactionInsideHeader = header && event.target instanceof Node && header.contains(event.target);

    if (!interactionInsideHeader) {
      closeNav();
    }
  };

  const outsideInteractionOptions = { passive: true, capture: true };

  document.addEventListener("pointerdown", closeNavFromOutside, outsideInteractionOptions);
  document.addEventListener("touchstart", closeNavFromOutside, outsideInteractionOptions);
  document.addEventListener("click", closeNavFromOutside);

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closeNav();
    }
  });
}

if (header) {
  const setHeaderState = () => {
    header.classList.toggle("is-scrolled", window.scrollY > 12);
  };

  setHeaderState();
  window.addEventListener("scroll", setHeaderState, { passive: true });
}

if (contactForm && formStatus) {
  contactForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const formData = new FormData(contactForm);
    const name = String(formData.get("name") || "").trim();
    const contact = String(formData.get("contact") || "").trim();
    const project = String(formData.get("project") || "").trim();
    const message = String(formData.get("message") || "").trim();

    const subject = encodeURIComponent(`Demande React Gestion - ${project}`);
    const body = encodeURIComponent(
      [
        `Nom : ${name}`,
        `Téléphone ou e-mail : ${contact}`,
        `Objet : ${project}`,
        "",
        "Message :",
        message
      ].join("\n")
    );

    formStatus.textContent = "Votre logiciel de messagerie va s'ouvrir avec la demande pré-remplie.";
    window.location.href = `mailto:reactgestion@outlook.com?subject=${subject}&body=${body}`;
  });
}
