function applySiteConfig() {
  const site = window.SITE || {};
  const demoUrl = site.demoUrl || "https://flowershop-demo.vercel.app";
  document.querySelectorAll("[data-demo-link]").forEach((link) => {
    link.href = demoUrl;
    link.target = "_blank";
    link.rel = "noopener";
  });

  const demoUrlEl = document.getElementById("demo-url");
  if (demoUrlEl) {
    demoUrlEl.textContent = demoUrl.replace(/^https?:\/\//, "");
  }

  const messageHref = site.messengerUrl || site.whatsappUrl || (site.email ? `mailto:${site.email}` : "");
  document.querySelectorAll("[data-message-link]").forEach((link) => {
    if (messageHref) {
      link.href = messageHref;
      if (!messageHref.startsWith("mailto:")) {
        link.target = "_blank";
        link.rel = "noopener";
      }
    } else {
      link.addEventListener("click", async (event) => {
        event.preventDefault();
        const text =
          "Hi Rance — I saw the multi-branch system. My business is ____, we have ____ branches. What's broken: ____";
        const status = document.getElementById("form-status");
        try {
          await navigator.clipboard.writeText(text);
        } catch {
          /* fallback below */
        }
        if (typeof navigator.share === "function") {
          try {
            await navigator.share({ title: "Message for Rance", text });
            if (status) status.textContent = "Send that to me on Messenger.";
            return;
          } catch {
            /* cancelled */
          }
        }
        if (status) status.textContent = "Copied a starter message — paste it to me on Messenger.";
      });
    }
  });
}

applySiteConfig();
