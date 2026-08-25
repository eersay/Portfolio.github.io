/* Window manager: create/focus/drag/resize/minimize/maximize windows for the desktop shell. */

const WM = (() => {
  const layer = document.getElementById("windows-layer");
  const wins = new Map(); // id -> { el, appId, restoreRect }
  let zTop = 10;
  let openOrder = []; // ids, most-recent last
  let cascadeCount = 0;

  function isMobile() {
    return window.matchMedia("(max-width: 768px)").matches;
  }

  function bringToFront(id) {
    const w = wins.get(id);
    if (!w) return;
    zTop += 1;
    w.el.style.zIndex = zTop;
    wins.forEach((v, k) => v.el.classList.toggle("focused", k === id));
    openOrder = openOrder.filter((x) => x !== id);
    openOrder.push(id);
  }

  function setDockRunning(appId, running) {
    document.querySelectorAll(`.dock-item[data-app="${appId}"]`).forEach((el) => {
      el.classList.toggle("running", running);
    });
  }

  function anyRunningForApp(appId) {
    for (const w of wins.values()) if (w.appId === appId) return true;
    return false;
  }

  function updateMobileVisibility(activeId) {
    wins.forEach((w, id) => w.el.classList.toggle("active-mobile", id === activeId));
  }

  function open(appId) {
    const app = APPS[appId];
    if (!app) return;

    // Only one window per app id (simple portfolio, not multi-instance)
    const existingId = [...wins.entries()].find(([, w]) => w.appId === appId)?.[0];
    if (existingId) {
      const w = wins.get(existingId);
      w.el.classList.remove("minimized");
      bringToFront(existingId);
      if (isMobile()) updateMobileVisibility(existingId);
      return existingId;
    }

    const id = `win-${appId}-${Date.now()}`;
    const el = document.createElement("div");
    el.className = "win";
    el.dataset.winId = id;
    el.dataset.appId = appId;

    const w = app.defaultSize || { w: 620, h: 480 };
    const offset = (cascadeCount++ % 6) * 24;
    const layerRect = layer.getBoundingClientRect();
    const left = Math.max(20, (layerRect.width - w.w) / 2 + offset - 60);
    const top = Math.max(16, (layerRect.height - w.h) / 2 + offset - 60);
    el.style.width = w.w + "px";
    el.style.height = w.h + "px";
    el.style.left = left + "px";
    el.style.top = top + "px";

    el.innerHTML = `
      <div class="win-titlebar">
        <button class="win-back" aria-label="Back"><i class="fas fa-chevron-left"></i></button>
        <div class="win-traffic">
          <button class="win-close" aria-label="Close">×</button>
          <button class="win-min" aria-label="Minimize">–</button>
          <button class="win-max" aria-label="Maximize">+</button>
        </div>
        <div class="win-title">${app.title}</div>
      </div>
      <div class="win-body"></div>
      <div class="win-resize"></div>
    `;

    layer.appendChild(el);
    wins.set(id, { el, appId, restoreRect: null });
    setDockRunning(appId, true);

    const body = el.querySelector(".win-body");
    app.render(body);

    wireWindow(id);
    bringToFront(id);
    if (isMobile()) updateMobileVisibility(id);

    return id;
  }

  function close(id) {
    const w = wins.get(id);
    if (!w) return;
    const appId = w.appId;
    w.el.remove();
    wins.delete(id);
    openOrder = openOrder.filter((x) => x !== id);
    if (!anyRunningForApp(appId)) setDockRunning(appId, false);
    if (isMobile()) {
      const next = openOrder[openOrder.length - 1];
      if (next) updateMobileVisibility(next);
    }
  }

  function minimize(id) {
    const w = wins.get(id);
    if (!w) return;
    w.el.classList.add("minimized");
  }

  function toggleMaximize(id) {
    const w = wins.get(id);
    if (!w) return;
    const el = w.el;
    if (el.classList.contains("maximized")) {
      el.classList.remove("maximized");
      if (w.restoreRect) {
        el.style.left = w.restoreRect.left;
        el.style.top = w.restoreRect.top;
        el.style.width = w.restoreRect.width;
        el.style.height = w.restoreRect.height;
      }
    } else {
      w.restoreRect = { left: el.style.left, top: el.style.top, width: el.style.width, height: el.style.height };
      el.classList.add("maximized");
    }
  }

  function wireWindow(id) {
    const w = wins.get(id);
    const el = w.el;
    const titlebar = el.querySelector(".win-titlebar");
    const closeBtn = el.querySelector(".win-close");
    const minBtn = el.querySelector(".win-min");
    const maxBtn = el.querySelector(".win-max");
    const backBtn = el.querySelector(".win-back");
    const resizeHandle = el.querySelector(".win-resize");

    el.addEventListener("mousedown", () => bringToFront(id));

    closeBtn.addEventListener("click", (e) => { e.stopPropagation(); close(id); });
    minBtn.addEventListener("click", (e) => { e.stopPropagation(); minimize(id); });
    maxBtn.addEventListener("click", (e) => { e.stopPropagation(); toggleMaximize(id); });
    backBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      if (w.appId !== "home") {
        close(id);
        open("home");
      } else {
        close(id);
      }
    });

    // Drag
    titlebar.addEventListener("pointerdown", (e) => {
      if (e.target.closest("button")) return;
      if (isMobile() || el.classList.contains("maximized")) return;
      e.preventDefault();
      bringToFront(id);
      const startX = e.clientX, startY = e.clientY;
      const startLeft = el.offsetLeft, startTop = el.offsetTop;
      const bounds = layer.getBoundingClientRect();

      function onMove(ev) {
        let nl = startLeft + (ev.clientX - startX);
        let nt = startTop + (ev.clientY - startY);
        nl = Math.min(Math.max(nl, -el.offsetWidth + 80), bounds.width - 80);
        nt = Math.min(Math.max(nt, 0), bounds.height - 30);
        el.style.left = nl + "px";
        el.style.top = nt + "px";
      }
      function onUp() {
        window.removeEventListener("pointermove", onMove);
        window.removeEventListener("pointerup", onUp);
      }
      window.addEventListener("pointermove", onMove);
      window.addEventListener("pointerup", onUp);
    });

    titlebar.addEventListener("dblclick", (e) => {
      if (e.target.closest("button")) return;
      toggleMaximize(id);
    });

    // Resize
    resizeHandle.addEventListener("pointerdown", (e) => {
      if (isMobile() || el.classList.contains("maximized")) return;
      e.preventDefault();
      e.stopPropagation();
      bringToFront(id);
      const startX = e.clientX, startY = e.clientY;
      const startW = el.offsetWidth, startH = el.offsetHeight;

      function onMove(ev) {
        const nw = Math.max(320, startW + (ev.clientX - startX));
        const nh = Math.max(220, startH + (ev.clientY - startY));
        el.style.width = nw + "px";
        el.style.height = nh + "px";
      }
      function onUp() {
        window.removeEventListener("pointermove", onMove);
        window.removeEventListener("pointerup", onUp);
      }
      window.addEventListener("pointermove", onMove);
      window.addEventListener("pointerup", onUp);
    });
  }

  function listOpen() {
    return openOrder.map((id) => ({ id, appId: wins.get(id).appId, title: APPS[wins.get(id).appId].title }));
  }

  return { open, close, minimize, toggleMaximize, bringToFront, listOpen, isMobile };
})();
