/* NovaBreeze — interações demonstrativas do front-end */
document.addEventListener("DOMContentLoaded", () => {
  // Menu mobile
  const menuButton = document.querySelector(".menu-toggle");
  const nav = document.querySelector("#topo nav");
  if (menuButton && nav) {
    menuButton.addEventListener("click", () => {
      const open = nav.classList.toggle("is-open");
      menuButton.setAttribute("aria-expanded", String(open));
      menuButton.setAttribute("aria-label", open ? "Fechar menu" : "Abrir menu");
      menuButton.innerHTML = open ? '<i class="bi bi-x-lg"></i>' : '<i class="bi bi-list"></i>';
    });
    nav.querySelectorAll("a").forEach(link => link.addEventListener("click", () => {
      nav.classList.remove("is-open");
      menuButton.setAttribute("aria-expanded", "false");
      menuButton.setAttribute("aria-label", "Abrir menu");
      menuButton.innerHTML = '<i class="bi bi-list"></i>';
    }));
  }

  // Alternância entre login e cadastro
  const tabs = document.querySelectorAll("[data-login-tab]");
  const signin = document.querySelector("#signin-form");
  const signup = document.querySelector("#signup-form");
  const profile = document.querySelector("#profile-panel");
  let activeUser = null;

  function showTab(tabName) {
    if (!signin || !signup) return;
    signin.hidden = tabName !== "signin";
    signup.hidden = tabName !== "signup";
    tabs.forEach(tab => {
      const active = tab.dataset.loginTab === tabName;
      tab.classList.toggle("active", active);
      tab.setAttribute("aria-selected", String(active));
    });
  }
  tabs.forEach(tab => tab.addEventListener("click", () => showTab(tab.dataset.loginTab)));

  function enterDemo(name) {
    activeUser = name;
    signin.hidden = true;
    signup.hidden = true;
    tabs.forEach(tab => tab.hidden = true);
    profile.hidden = false;
    document.querySelector("#profile-name").textContent = name;
  }
  if (signin) signin.addEventListener("submit", event => {
    event.preventDefault();
    const email = document.querySelector("#signin-email").value.trim();
    const name = email.split("@")[0].replace(/[._-]/g, " ");
    enterDemo(name || "Cliente");
  });
  if (signup) signup.addEventListener("submit", event => {
    event.preventDefault();
    const name = document.querySelector("#signup-name").value.trim().split(" ")[0];
    enterDemo(name || "Cliente");
  });
  const logout = document.querySelector("#logout-button");
  if (logout) logout.addEventListener("click", () => {
    activeUser = null;
    profile.hidden = true;
    tabs.forEach(tab => tab.hidden = false);
    signin.reset();
    signup.reset();
    showTab("signin");
  });

  // Avaliações: adiciona comentários à lista atual, sem persistência/servidor
  const reviewForm = document.querySelector("#review-form");
  const reviewList = document.querySelector("#review-list");
  if (reviewForm && reviewList) {
    reviewForm.addEventListener("submit", event => {
      event.preventDefault();
      const name = document.querySelector("#review-name").value.trim();
      const rating = Number(document.querySelector("#review-rating").value);
      const comment = document.querySelector("#review-comment").value.trim();
      if (!name || !comment || rating < 1 || rating > 5) return;
      const card = document.createElement("article");
      card.className = "review-card";
      const top = document.createElement("div");
      top.className = "review-card-top";
      const author = document.createElement("strong");
      author.textContent = name;
      const stars = document.createElement("span");
      stars.className = "stars";
      stars.textContent = "★".repeat(rating) + "☆".repeat(5-rating);
      const meta = document.createElement("small");
      meta.innerHTML = '<i class="bi bi-chat-square-text"></i> Avaliação enviada agora';
      const body = document.createElement("p");
      body.textContent = comment;
      top.append(author, stars);
      card.append(top, meta, body);
      reviewList.prepend(card);
      reviewForm.reset();
      const note = reviewForm.querySelector(".form-note");
      note.textContent = "Sua avaliação foi adicionada à demonstração desta página.";
    });
  }

  // Imagens que ainda usam nomes ilustrativos do wireframe recebem fotos locais.
  const fallbacks = [
    "imagens/poltrona-1-20.png.webp",
    "imagens/Cadeira-1-11.png.webp",
    "imagens/mobiliario_area_exerna_hidrotec-4.webp",
    "imagens/Sofa-1-1.png.webp"
  ];
  document.querySelectorAll("img").forEach((img, index) => {
    img.addEventListener("error", () => {
      if (img.dataset.fallbackApplied) return;
      img.dataset.fallbackApplied = "true";
      img.src = fallbacks[index % fallbacks.length];
    });
  });
});
