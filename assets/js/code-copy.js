document.addEventListener("DOMContentLoaded", () => {
  const codeBlocks = document.querySelectorAll(".doc-content pre");

  codeBlocks.forEach((pre) => {
    const code = pre.querySelector("code");

    if (!code) {
      return;
    }

    const button = document.createElement("button");
    button.type = "button";
    button.className = "copy-button";
    button.textContent = "Copy";
    button.setAttribute("aria-label", "Copy code to clipboard");

    button.addEventListener("click", async () => {
      const text = code.innerText.replace(/\n$/, "");

      try {
        await navigator.clipboard.writeText(text);
        button.textContent = "Copied";
        button.classList.add("is-copied");
      } catch (error) {
        button.textContent = "Press Ctrl+C";
        button.classList.add("is-copied");
      }

      window.setTimeout(() => {
        button.textContent = "Copy";
        button.classList.remove("is-copied");
      }, 1800);
    });

    pre.classList.add("has-copy-button");
    pre.appendChild(button);
  });
});
