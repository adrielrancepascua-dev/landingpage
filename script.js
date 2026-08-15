const catalogs = {
  flowers: {
    banner: "Same dashboard · flower shop catalog",
    rows: [
      ["Red rose (stem)", "120", "90"],
      ["Wrapping paper", "70", "60"],
      ["Greeting card pack", "40", "35"],
    ],
  },
  hardware: {
    banner: "Same dashboard · hardware catalog",
    rows: [
      ['1" hex bolt', "340", "210"],
      ["PVC elbow 1/2\"", "180", "95"],
      ["Roll of electrical tape", "64", "40"],
    ],
  },
  bakery: {
    banner: "Same dashboard · bakery catalog",
    rows: [
      ["Pandesal tray", "28", "16"],
      ["Ube loaf", "12", "9"],
      ["Buttercream tub", "8", "5"],
    ],
  },
};

function renderCatalog(key) {
  const catalog = catalogs[key] || catalogs.flowers;
  const banner = document.getElementById("catalog-banner");
  const body = document.getElementById("catalog-rows");
  if (!banner || !body) return;
  banner.textContent = catalog.banner;
  body.innerHTML = catalog.rows
    .map(([item, north, midtown]) => `<tr><td>${item}</td><td>${north}</td><td>${midtown}</td></tr>`)
    .join("");
}

function wireCatalogTabs() {
  const tabs = document.querySelectorAll("[data-catalog]");
  tabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      tabs.forEach((other) => other.setAttribute("aria-selected", String(other === tab)));
      renderCatalog(tab.dataset.catalog);
    });
  });
  renderCatalog("flowers");
}

function applySiteConfig() {
  const site = window.SITE || {};
  const demoUrl = site.demoUrl || "https://flowershop-demo.vercel.app";
  document.querySelectorAll("[data-demo-link]").forEach((link) => {
    link.href = demoUrl;
  });

  const channels = document.getElementById("channel-buttons");
  if (!channels) return;
  const buttons = [];
  if (site.messengerUrl) {
    buttons.push(`<a class="btn btn-secondary" href="${site.messengerUrl}">Message me on Messenger</a>`);
  }
  if (site.whatsappUrl) {
    buttons.push(`<a class="btn btn-secondary" href="${site.whatsappUrl}">Message me on WhatsApp</a>`);
  }
  if (site.email) {
    buttons.push(`<a class="btn btn-secondary" href="mailto:${site.email}">Email me</a>`);
  }
  if (buttons.length) {
    channels.hidden = false;
    channels.innerHTML = buttons.join("");
  }
}

function composeMessage(form) {
  const business = form.business.value.trim();
  const branches = form.branches.value;
  const broken = form.broken.value.trim();
  const reach = form.reach.value.trim();
  return [
    "Hi Rance — I saw the multi-branch system.",
    `Business: ${business}`,
    `Branches: ${branches}`,
    `What's broken: ${broken}`,
    reach ? `Reach me: ${reach}` : "",
  ]
    .filter(Boolean)
    .join("\n");
}

function wireForm() {
  const form = document.getElementById("talk-form");
  const status = document.getElementById("form-status");
  if (!form || !status) return;

  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    const message = composeMessage(form);
    const site = window.SITE || {};
    status.textContent = "";

    try {
      await navigator.clipboard.writeText(message);
    } catch {
      /* clipboard can fail on older webviews; sharing still works */
    }

    if (site.email) {
      const mailto = `mailto:${encodeURIComponent(site.email)}?subject=${encodeURIComponent(
        "Multi-branch system — " + form.business.value.trim(),
      )}&body=${encodeURIComponent(message)}`;
      window.location.href = mailto;
      status.textContent = "Opening your email with this filled in.";
      return;
    }

    if (typeof navigator.share === "function") {
      try {
        await navigator.share({ title: "Message for Rance", text: message });
        status.textContent = "Send that to me on Messenger (or wherever we were talking).";
        return;
      } catch {
        /* user cancelled share */
      }
    }

    status.textContent = "Copied. Paste it to me on Messenger and I’ll reply.";
  });
}

applySiteConfig();
wireCatalogTabs();
wireForm();
