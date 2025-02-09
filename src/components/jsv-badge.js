class JsvBadge extends HTMLElement {
  constructor() {
    super();
    const shadow = this.attachShadow({ mode: "open" });
    const style = document.createElement("style");
    style.textContent = `
      span {
        padding: 0.5rem 1rem;
        background: var(--background);
        border-radius: 1rem;
        font-family: GeneralSans-Medium, sans-serif;
        font-weight: 700;
      }
    `;
    this.span = document.createElement("span");
    this.span.textContent = this.getAttribute("label") || "success";
    shadow.appendChild(style);
    shadow.appendChild(this.span);
  }

  static get observedAttributes() {
    return ["label"];
  }

  attributeChangeCallback(name, old, newVal) {
    if (name === "label") {
      this.buttom.textContent = newVal;
    }
  }
}

customElements.define("my-badge", JsvBadge);
