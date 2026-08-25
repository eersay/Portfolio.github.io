/* Fake terminal app. Reads from DATA, writes to a per-window log element. */

const Terminal = (() => {
  function fmtExperience() {
    return DATA.experience.map((e) => `${e.role} — ${e.company} (${e.date})`).join("\n");
  }
  function fmtProjects() {
    return DATA.projects.map((p) => `${p.name}: ${p.desc}\n  ${p.github}`).join("\n\n");
  }
  function fmtSkills() {
    return DATA.skills.map((g) => `${g.group}: ${g.items.join(", ")}`).join("\n");
  }
  function fmtEducation() {
    return DATA.education.map((e) => `${e.degree} — ${e.school} (${e.detail})`).join("\n");
  }
  function fmtContact() {
    const p = DATA.profile;
    return `${p.email}\n${p.phone}\n${p.location}\n${p.github}\n${p.linkedin}`;
  }

  const commands = {
    help: () => `Available commands:
  help          show this list
  whoami        who is this site about
  about         short bio
  experience    work history
  projects      selected projects
  skills        technical skills
  education     degrees & activities
  contact       email / phone / links
  resume        open resume
  open <app>    open a window (home, projects, skills, education, certifications, contact)
  clear         clear the screen`,
    whoami: () => `${DATA.profile.name} — ${DATA.profile.role}`,
    about: () => DATA.profile.bio,
    experience: fmtExperience,
    projects: fmtProjects,
    skills: fmtSkills,
    education: fmtEducation,
    contact: fmtContact,
    resume: () => { window.open(DATA.profile.resumeUrl, "_blank"); return "Opening resume…"; },
    ls: () => "home  experience  projects  skills  education  certifications  contact",
    sudo: () => "Nice try. Permission denied — you're not in the sudoers file. This incident will be reported (jk).",
    exit: () => "Can't exit a portfolio. Try 'clear' instead.",
  };

  function attach(root) {
    const log = root.querySelector(".term-log");
    const input = root.querySelector(".term-input");

    function print(text, cls = "term-out") {
      const line = document.createElement("div");
      line.className = cls;
      line.textContent = text;
      log.appendChild(line);
      log.scrollTop = log.scrollHeight;
    }

    function run(raw) {
      const cmdLine = document.createElement("div");
      cmdLine.className = "term-line term-prompt-echo";
      cmdLine.textContent = raw;
      log.appendChild(cmdLine);

      const [cmd, ...args] = raw.trim().split(/\s+/);
      if (!cmd) return;

      if (cmd === "clear") { log.innerHTML = ""; return; }

      if (cmd === "open" && args[0]) {
        const target = args[0].toLowerCase();
        if (APPS[target]) {
          WM.open(target);
          print(`Opening ${target}…`);
        } else {
          print(`No such app: ${target}`);
        }
        return;
      }

      const handler = commands[cmd.toLowerCase()];
      if (handler) {
        print(handler());
      } else {
        print(`command not found: ${cmd} (try 'help')`);
      }
      log.scrollTop = log.scrollHeight;
    }

    input.addEventListener("keydown", (e) => {
      if (e.key === "Enter") {
        const val = input.value;
        input.value = "";
        if (val.trim()) run(val);
      }
    });

    root.addEventListener("click", () => input.focus());
    input.focus();
  }

  return { attach };
})();
