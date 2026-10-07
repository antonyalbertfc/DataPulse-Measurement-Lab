// UI only. Published GTM tags handle measurement; tracking.js handles consent.
const form = document.querySelector("#lead-form");
const success = document.querySelector("#success");
let completed = false;
form.addEventListener("submit", (event) => {
  event.preventDefault();
  if (completed || !form.reportValidity()) return;
  completed = true;
  form.hidden = true;
  success.hidden = false;
  success.focus();
  // Confirmação LOCAL SIMULADA; não envia nem armazena os campos.
  document.dispatchEvent(new CustomEvent("lab:lead-success", {
    detail: { submission_id: crypto.randomUUID(), simulated: true }
  }));
});
document.querySelector("#restart").addEventListener("click", () => {
  form.reset(); completed = false;
  success.hidden = true; form.hidden = false;
  document.querySelector("#name").focus();
  document.dispatchEvent(new CustomEvent("lab:form-reset"));
});
const menuButton = document.querySelector(".menu-toggle");
const nav = document.querySelector("#main-nav");
function closeMenu() {
  nav.classList.remove("open");
  menuButton.setAttribute("aria-expanded", "false");
  menuButton.setAttribute("aria-label", window.DataPulseI18n.t("Abrir menu"));
}
menuButton.addEventListener("click", () => {
  const open = nav.classList.toggle("open");
  menuButton.setAttribute("aria-expanded", String(open));
  menuButton.setAttribute("aria-label", window.DataPulseI18n.t(open ? "Fechar menu" : "Abrir menu"));
});
nav.addEventListener("click", (event) => { if(event.target.closest("a")) closeMenu(); });
document.addEventListener("keydown", (event) => {
  if(event.key === "Escape" && nav.classList.contains("open")) { closeMenu(); menuButton.focus(); }
});
// Sem número configurado: nenhum redirecionamento ou envio de mensagem.
const whatsappDialog = document.querySelector("#whatsapp-dialog");
document.querySelectorAll("[data-whatsapp-position]").forEach((button) => {
  button.addEventListener("click", () => whatsappDialog.showModal());
});
whatsappDialog.querySelectorAll(".dialog-close, .dialog-done").forEach((button) => {
  button.addEventListener("click", () => whatsappDialog.close());
});
if ("IntersectionObserver" in window && !matchMedia("(prefers-reduced-motion: reduce)").matches) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if(entry.isIntersecting) { entry.target.classList.add("visible"); observer.unobserve(entry.target); }
    });
  }, {threshold: 0.08});
  document.documentElement.classList.add("motion-ready");
  document.querySelectorAll(".reveal").forEach((element) => observer.observe(element));
}


