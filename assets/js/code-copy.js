document.addEventListener("DOMContentLoaded", () => {
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
