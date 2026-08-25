/* Cmd/Ctrl+K search palette — filters apps, projects, and skills. */

const Search = (() => {
  const overlay = document.getElementById("search-overlay");
  const backdrop = document.getElementById("search-backdrop");
  const input = document.getElementById("search-input");
  const resultsEl = document.getElementById("search-results");
  let items = [];
  let activeIdx = 0;

  function buildIndex() {
    const list = [];
    Object.entries(APPS).forEach(([id, app]) => {
      list.push({ kind: "App", label: app.title, meta: "Open window", action: () => WM.open(id) });
    });
    DATA.projects.forEach((p) => {
      list.push({ kind: "Project", label: p.name, meta: p.tags.join(", "), action: () => WM.open("projects") });
    });
    DATA.skills.forEach((g) => {
      g.items.forEach((s) => {
        list.push({ kind: "Skill", label: s, meta: g.group, action: () => WM.open("skills") });
      });
    });
    return list;
  }

  function render(query) {
    const q = query.trim().toLowerCase();
    const all = items;
    const filtered = q ? all.filter((it) => it.label.toLowerCase().includes(q) || it.kind.toLowerCase().includes(q)) : all.filter((it) => it.kind === "App");
    activeIdx = 0;

    if (!filtered.length) {
      resultsEl.innerHTML = `<div class="search-empty">No matches for "${query}"</div>`;
      return;
    }

    resultsEl.innerHTML = filtered.slice(0, 30).map((it, i) => `
      <div class="search-result${i === 0 ? " active" : ""}" data-idx="${i}">
        <div class="sr-title">${it.label}</div>
        <div class="sr-meta">${it.kind} · ${it.meta}</div>
      </div>
    `).join("");

    resultsEl.dataset.count = filtered.length;
    resultsEl._filtered = filtered;

    resultsEl.querySelectorAll(".search-result").forEach((el) => {
      el.addEventListener("click", () => {
        filtered[Number(el.dataset.idx)].action();
        close();
      });
    });
  }

  function moveActive(delta) {
    const els = [...resultsEl.querySelectorAll(".search-result")];
    if (!els.length) return;
    activeIdx = (activeIdx + delta + els.length) % els.length;
    els.forEach((el, i) => el.classList.toggle("active", i === activeIdx));
    els[activeIdx].scrollIntoView({ block: "nearest" });
  }

  function open() {
    items = buildIndex();
    overlay.classList.add("open");
    input.value = "";
    render("");
    setTimeout(() => input.focus(), 0);
  }

  function close() {
    overlay.classList.remove("open");
  }

  function toggle() {
    if (overlay.classList.contains("open")) close(); else open();
  }

  input.addEventListener("input", () => render(input.value));
  input.addEventListener("keydown", (e) => {
    if (e.key === "Escape") { close(); return; }
    if (e.key === "ArrowDown") { e.preventDefault(); moveActive(1); return; }
    if (e.key === "ArrowUp") { e.preventDefault(); moveActive(-1); return; }
    if (e.key === "Enter") {
      const filtered = resultsEl._filtered || [];
      if (filtered[activeIdx]) {
        filtered[activeIdx].action();
        close();
      }
    }
  });
  backdrop.addEventListener("click", close);

  document.addEventListener("keydown", (e) => {
    if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
      e.preventDefault();
      toggle();
    }
  });

  return { open, close, toggle };
})();
