/* App registry: each app renders its window body from DATA (data.js). */

function esc(str) {
  const d = document.createElement("div");
  d.textContent = str;
  return d.innerHTML;
}

const APPS = {
  home: {
    title: "Home",
    icon: "fa-house",
    defaultSize: { w: 620, h: 500 },
    render(body) {
      const p = DATA.profile;
      body.innerHTML = `
        <p class="home-eyebrow">${esc(p.role)}</p>
        <h1 class="home-name">${esc(p.name)}</h1>
        <p class="home-role">${esc(p.tagline)}</p>
        <p class="home-desc">${esc(p.bio)}</p>
        <div class="home-contact">
          <span><i class="fas fa-envelope"></i> <a class="inline-link" href="mailto:${p.email}">${esc(p.email)}</a></span>
          <span><i class="fas fa-phone"></i> ${esc(p.phone)}</span>
          <span><i class="fas fa-map-marker-alt"></i> ${esc(p.location)}</span>
        </div>
        <div class="home-actions">
          <a class="btn-primary" href="${p.resumeUrl}" target="_blank" rel="noopener"><i class="fas fa-download"></i> Resume</a>
          <div class="social-links">
            <a href="${p.github}" target="_blank" rel="noopener" aria-label="GitHub"><i class="fab fa-github"></i></a>
            <a href="${p.linkedin}" target="_blank" rel="noopener" aria-label="LinkedIn"><i class="fab fa-linkedin"></i></a>
          </div>
        </div>
      `;
    },
  },

  experience: {
    title: "Experience",
    icon: "fa-briefcase",
    render(body) {
      body.innerHTML = `
        <p class="section-label">Career</p>
        <h2 class="section-title">Experience</h2>
        <div class="timeline">
          ${DATA.experience.map((e) => `
            <div class="timeline-item">
              <div class="timeline-date">${esc(e.date)}</div>
              <div class="timeline-line"><div class="timeline-dot"></div><div class="timeline-connector"></div></div>
              <div class="timeline-body">
                <div class="timeline-role">${esc(e.role)}</div>
                <div class="timeline-company">${esc(e.company)}</div>
                <ul>${e.points.map((pt) => `<li>${esc(pt)}</li>`).join("")}</ul>
              </div>
            </div>
          `).join("")}
        </div>
      `;
    },
  },

  projects: {
    title: "Projects",
    icon: "fa-diagram-project",
    defaultSize: { w: 700, h: 540 },
    render(body) {
      body.innerHTML = `
        <p class="section-label">Work</p>
        <h2 class="section-title">Projects</h2>
        <div class="projects-grid">
          ${DATA.projects.map((pr) => `
            <div class="project-card${pr.featured ? " featured" : ""}">
              ${pr.featured ? `<div class="project-featured-tag">Featured</div>` : ""}
              <div class="project-header">
                <div class="project-name">${esc(pr.name)}</div>
                <div class="project-links">
                  ${pr.live ? `<a href="${pr.live}" target="_blank" rel="noopener" aria-label="Live site"><i class="fas fa-arrow-up-right-from-square"></i></a>` : ""}
                  <a href="${pr.github}" target="_blank" rel="noopener" aria-label="GitHub"><i class="fab fa-github"></i></a>
                </div>
              </div>
              <p class="project-desc">${esc(pr.desc)}</p>
              <div class="project-tags">${pr.tags.map((t) => `<span class="tag">${esc(t)}</span>`).join("")}</div>
            </div>
          `).join("")}
        </div>
      `;
    },
  },

  skills: {
    title: "Skills",
    icon: "fa-layer-group",
    render(body) {
      body.innerHTML = `
        <p class="section-label">Stack</p>
        <h2 class="section-title">Technical Skills</h2>
        <div class="skills-groups">
          ${DATA.skills.map((g) => `
            <div class="skill-group">
              <div class="skill-group-title">${esc(g.group)}</div>
              <div class="skill-list">${g.items.map((s) => `<span class="skill-chip">${esc(s)}</span>`).join("")}</div>
            </div>
          `).join("")}
        </div>
      `;
    },
  },

  education: {
    title: "Education",
    icon: "fa-graduation-cap",
    defaultSize: { w: 560, h: 380 },
    render(body) {
      body.innerHTML = `
        <p class="section-label">Academic</p>
        <h2 class="section-title">Education</h2>
        <div class="education-cards">
          ${DATA.education.map((e) => `
            <div class="edu-card">
              <div class="edu-degree">${esc(e.degree)}</div>
              <div class="edu-school">${esc(e.school)}</div>
              <div class="edu-detail">${esc(e.detail)}</div>
            </div>
          `).join("")}
        </div>
        <p class="section-label" style="margin-top:22px;">Community</p>
        <h2 class="section-title">Leadership &amp; Activities</h2>
        <div class="leadership-list">
          ${DATA.leadership.map((l) => `<div class="leadership-item">${esc(l)}</div>`).join("")}
        </div>
      `;
    },
  },

  certifications: {
    title: "Certifications",
    icon: "fa-certificate",
    defaultSize: { w: 680, h: 540 },
    render(body) {
      const cats = ["all", "data", "cloud", "dev", "security", "other"];
      const labels = { all: "All", data: "Data & ML", cloud: "Cloud", dev: "Development", security: "Security", other: "Other" };
      let active = "all";

      body.innerHTML = `
        <p class="section-label">Credentials</p>
        <h2 class="section-title">Certifications</h2>
        <div class="cert-filters">
          ${cats.map((c) => `<button class="cf-btn${c === "all" ? " active" : ""}" data-cat="${c}">${labels[c]}</button>`).join("")}
        </div>
        <div class="certs-gallery"></div>
      `;

      const gallery = body.querySelector(".certs-gallery");
      const filterBtns = [...body.querySelectorAll(".cf-btn")];

      function renderGallery() {
        const list = active === "all" ? DATA.certs : DATA.certs.filter((c) => c.cat === active);
        gallery.innerHTML = list.map((c) => `
          <div class="cert-thumb" data-id="${c.id}">
            <img class="cert-thumb-img" src="${c.img}" alt="${esc(c.title)}" loading="lazy" />
            <div class="cert-thumb-info">
              <div class="cert-thumb-title">${esc(c.title)}</div>
              <div class="cert-thumb-meta">${esc(c.issuer)} · ${esc(c.date)}</div>
            </div>
          </div>
        `).join("") || `<p style="color:var(--fg-muted)">No certifications in this category.</p>`;

        gallery.querySelectorAll(".cert-thumb").forEach((el) => {
          el.addEventListener("click", () => openCertModal(el.dataset.id, list));
        });
      }

      filterBtns.forEach((btn) => {
        btn.addEventListener("click", () => {
          active = btn.dataset.cat;
          filterBtns.forEach((b) => b.classList.toggle("active", b === btn));
          renderGallery();
        });
      });

      renderGallery();
    },
  },

  contact: {
    title: "Contact",
    icon: "fa-address-card",
    defaultSize: { w: 480, h: 360 },
    render(body) {
      const p = DATA.profile;
      body.innerHTML = `
        <p class="section-label">Get in touch</p>
        <h2 class="section-title">Contact</h2>
        <div class="contact-list">
          <a class="contact-row" href="mailto:${p.email}"><span class="glyph"><i class="fas fa-envelope"></i></span>${esc(p.email)}</a>
          <div class="contact-row"><span class="glyph"><i class="fas fa-phone"></i></span>${esc(p.phone)}</div>
          <div class="contact-row"><span class="glyph"><i class="fas fa-map-marker-alt"></i></span>${esc(p.location)}</div>
          <a class="contact-row" href="${p.github}" target="_blank" rel="noopener"><span class="glyph"><i class="fab fa-github"></i></span>GitHub</a>
          <a class="contact-row" href="${p.linkedin}" target="_blank" rel="noopener"><span class="glyph"><i class="fab fa-linkedin"></i></span>LinkedIn</a>
        </div>
      `;
    },
  },

  terminal: {
    title: "Terminal",
    icon: "fa-terminal",
    defaultSize: { w: 560, h: 400 },
    render(body) {
      body.style.padding = "0";
      body.innerHTML = `
        <div class="terminal-body">
          <div class="term-log"><div class="term-out">Welcome to Bhagyasree's terminal. Type <b>help</b> to get started.</div></div>
          <div class="term-input-row"><input class="term-input" type="text" autocomplete="off" spellcheck="false" /></div>
        </div>
      `;
      Terminal.attach(body.querySelector(".terminal-body"));
    },
  },
};

/* --- Certification lightbox (shared singleton modal in the DOM) --- */
function openCertModal(id, list) {
  const modal = document.getElementById("cert-modal");
  const imgEl = document.getElementById("modal-img");
  const titleEl = document.getElementById("modal-title");
  const metaEl = document.getElementById("modal-meta");
  let idx = list.findIndex((c) => c.id === id);

  function show() {
    const c = list[idx];
    imgEl.src = c.img;
    imgEl.alt = c.title;
    titleEl.textContent = c.title;
    metaEl.innerHTML = `${esc(c.issuer)} · ${esc(c.date)}` + (c.credly ? ` · <a class="inline-link" href="${c.credly}" target="_blank" rel="noopener">Verify on Credly</a>` : "");
  }

  show();
  modal.classList.add("open");

  const prevBtn = document.getElementById("modal-prev");
  const nextBtn = document.getElementById("modal-next");
  const closeBtn = document.getElementById("modal-close");
  const backdrop = document.getElementById("modal-backdrop");

  function onPrev() { idx = (idx - 1 + list.length) % list.length; show(); }
  function onNext() { idx = (idx + 1) % list.length; show(); }
  function onClose() {
    modal.classList.remove("open");
    prevBtn.removeEventListener("click", onPrev);
    nextBtn.removeEventListener("click", onNext);
    closeBtn.removeEventListener("click", onClose);
    backdrop.removeEventListener("click", onClose);
    document.removeEventListener("keydown", onKey);
  }
  function onKey(e) {
    if (e.key === "Escape") onClose();
    if (e.key === "ArrowLeft") onPrev();
    if (e.key === "ArrowRight") onNext();
  }

  prevBtn.addEventListener("click", onPrev);
  nextBtn.addEventListener("click", onNext);
  closeBtn.addEventListener("click", onClose);
  backdrop.addEventListener("click", onClose);
  document.addEventListener("keydown", onKey);
}
