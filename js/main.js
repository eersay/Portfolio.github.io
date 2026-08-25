/* Bootstraps the desktop shell: clock, dock, desktop icons, menu bar, theme, mobile fallback. */

function openApp(appId) {
  WM.open(appId);
  document.querySelectorAll(`.dock-item[data-app="${appId}"]`).forEach((el) => el.classList.add("running"));
}

// Dock clicks
document.querySelectorAll(".dock-item").forEach((el) => {
  el.addEventListener("click", () => openApp(el.dataset.app));
});

// Desktop icon double-clicks (single click also works, more forgiving on touch)
document.querySelectorAll(".desktop-icon").forEach((el) => {
  el.addEventListener("click", () => openApp(el.dataset.app));
});

// Menu bar app shortcuts (File/Edit/View/Help act as quick-open buttons)
document.querySelectorAll(".mb-item[data-app]").forEach((el) => {
  el.addEventListener("click", () => openApp(el.dataset.app));
});

// Logo dropdown
const logoBtn = document.getElementById("mb-logo-btn");
const logoMenu = document.getElementById("mb-logo-menu");
logoBtn.addEventListener("click", (e) => {
  e.stopPropagation();
  closeAllDropdowns(logoMenu);
  logoMenu.classList.toggle("open");
  logoBtn.classList.toggle("active", logoMenu.classList.contains("open"));
});

// Window menu (lists open windows)
const windowBtn = document.getElementById("mb-window-btn");
const windowMenu = document.getElementById("mb-window-menu");
windowBtn.addEventListener("click", (e) => {
  e.stopPropagation();
  const open = WM.listOpen();
  windowMenu.innerHTML = open.length
    ? open.map((w) => `<button data-win="${w.id}">${w.title}</button>`).join("")
    : `<div class="mb-empty">No windows open</div>`;
  windowMenu.querySelectorAll("button[data-win]").forEach((btn) => {
    btn.addEventListener("click", () => {
      WM.bringToFront(btn.dataset.win);
      document.querySelectorAll(".win").forEach((w) => w.classList.remove("minimized"));
      closeAllDropdowns();
    });
  });
  closeAllDropdowns(windowMenu);
  windowMenu.classList.toggle("open");
  windowBtn.classList.toggle("active", windowMenu.classList.contains("open"));
});

function closeAllDropdowns(except) {
  document.querySelectorAll(".mb-dropdown").forEach((d) => {
    if (d !== except) d.classList.remove("open");
  });
  document.querySelectorAll(".mb-item").forEach((b) => b.classList.remove("active"));
}
document.addEventListener("click", () => closeAllDropdowns());

// Search
document.getElementById("search-btn").addEventListener("click", () => Search.open());

// Theme toggle (dark <-> dim)
const themeBtn = document.getElementById("theme-toggle");
const savedTheme = localStorage.getItem("br-theme");
if (savedTheme === "dim") {
  document.documentElement.setAttribute("data-theme", "dim");
  themeBtn.innerHTML = '<i class="fas fa-sun"></i>';
}
themeBtn.addEventListener("click", () => {
  const isDim = document.documentElement.getAttribute("data-theme") === "dim";
  if (isDim) {
    document.documentElement.removeAttribute("data-theme");
    themeBtn.innerHTML = '<i class="fas fa-moon"></i>';
    localStorage.setItem("br-theme", "dark");
  } else {
    document.documentElement.setAttribute("data-theme", "dim");
    themeBtn.innerHTML = '<i class="fas fa-sun"></i>';
    localStorage.setItem("br-theme", "dim");
  }
});

// Clock
function tickClock() {
  const el = document.getElementById("mb-clock");
  const now = new Date();
  el.textContent = now.toLocaleString("en-US", {
    weekday: "short", month: "short", day: "numeric",
    hour: "numeric", minute: "2-digit",
  });
}
tickClock();
setInterval(tickClock, 1000 * 15);

// Open Home on load
openApp("home");
