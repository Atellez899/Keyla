const copyButton = document.getElementById("copy-verses");
const toggleButton = document.getElementById("toggle-theme");
const status = document.getElementById("copy-status");
const page = document.querySelector(".page");

const verseLines = Array.from(document.querySelectorAll(".verse")).map(
  (verse) => verse.textContent.trim()
);

// Copia compatible con navegadores que no exponen la API Clipboard en archivos locales.
const fallbackCopy = (text) => {
  const helper = document.createElement("textarea");
  helper.value = text;
  helper.setAttribute("readonly", "");
  helper.style.position = "absolute";
  helper.style.left = "-9999px";
  document.body.appendChild(helper);
  helper.select();
  document.execCommand("copy");
  document.body.removeChild(helper);
};

const copyVerses = async () => {
  const textToCopy = verseLines.join("\n");

  try {
    if (navigator.clipboard?.writeText) {
      await navigator.clipboard.writeText(textToCopy);
    } else {
      fallbackCopy(textToCopy);
    }
    status.textContent = "Versículos copiados.";
  } catch (error) {
    status.textContent = "No se pudo copiar. Selecciona el texto manualmente.";
  }

  window.setTimeout(() => {
    status.textContent = "";
  }, 2400);
};

// Aplica el tema y sincroniza el estado del botón.
const applyTheme = (theme) => {
  page.dataset.theme = theme;
  const isNight = theme === "night";
  toggleButton.setAttribute("aria-pressed", String(isNight));
  toggleButton.textContent = isNight ? "Modo claro" : "Modo noche";
};

const storedTheme = localStorage.getItem("theme");
if (storedTheme === "night" || storedTheme === "light") {
  applyTheme(storedTheme);
}

copyButton?.addEventListener("click", copyVerses);

toggleButton?.addEventListener("click", () => {
  const nextTheme = page.dataset.theme === "night" ? "light" : "night";
  applyTheme(nextTheme);
  localStorage.setItem("theme", nextTheme);
});
