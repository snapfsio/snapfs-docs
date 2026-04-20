document.addEventListener("DOMContentLoaded", () => {
  const tabGroups = document.querySelectorAll("[data-tabs]");

  tabGroups.forEach((group, groupIndex) => {
    const tabs = group.querySelectorAll("[data-tab]");
    const panels = group.querySelectorAll("[data-tab-panel]");

    if (!tabs.length || !panels.length) {
      return;
    }

    const activateTab = (targetName) => {
      tabs.forEach((tab, tabIndex) => {
        const isActive = tab.dataset.tab === targetName;
        const panel = panels[tabIndex];

        tab.classList.toggle("is-active", isActive);
        tab.setAttribute("aria-selected", String(isActive));
        tab.setAttribute("tabindex", isActive ? "0" : "-1");

        if (panel) {
          panel.hidden = !isActive;
        }
      });
    };

    tabs.forEach((tab, tabIndex) => {
      const panel = panels[tabIndex];
      const tabId = `docs-tab-${groupIndex}-${tabIndex}`;
      const panelId = `docs-panel-${groupIndex}-${tabIndex}`;

      tab.setAttribute("role", "tab");
      tab.setAttribute("id", tabId);
      tab.setAttribute("aria-controls", panelId);

      if (panel) {
        panel.setAttribute("role", "tabpanel");
        panel.setAttribute("id", panelId);
        panel.setAttribute("aria-labelledby", tabId);
      }

      tab.addEventListener("click", () => activateTab(tab.dataset.tab));
    });

    const defaultTab = group.getAttribute("data-default-tab") || tabs[0].dataset.tab;
    activateTab(defaultTab);
  });

  const codeBlocks = document.querySelectorAll(".doc-content pre");
  const copyIcon = `
    <svg viewBox="0 0 20 20" aria-hidden="true" focusable="false">
      <rect x="7" y="3.5" width="9.5" height="11" rx="2"></rect>
      <path d="M5.5 6H5a1.5 1.5 0 0 0-1.5 1.5V15A1.5 1.5 0 0 0 5 16.5h6.5"></path>
    </svg>
  `;

  codeBlocks.forEach((pre) => {
    const code = pre.querySelector("code");

    if (!code) {
      return;
    }

    const button = document.createElement("button");
    button.type = "button";
    button.className = "copy-button";
    button.setAttribute("aria-label", "Copy code to clipboard");
    button.setAttribute("title", "Copy code");
    button.innerHTML = copyIcon;

    button.addEventListener("click", async () => {
      const text = code.innerText.replace(/\n$/, "");

      try {
        await navigator.clipboard.writeText(text);
        button.classList.add("is-copied");
        button.setAttribute("aria-label", "Copied");
        button.setAttribute("title", "Copied");
      } catch (error) {
        button.classList.add("is-copied");
        button.setAttribute("aria-label", "Copy failed");
        button.setAttribute("title", "Copy failed");
      }

      window.setTimeout(() => {
        button.classList.remove("is-copied");
        button.setAttribute("aria-label", "Copy code to clipboard");
        button.setAttribute("title", "Copy code");
      }, 1800);
    });

    pre.classList.add("has-copy-button");
    pre.appendChild(button);
  });
});
