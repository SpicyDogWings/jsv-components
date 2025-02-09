class WebButton extends HTMLElement {
  constructor() {
    super();
    // Attach a shadow root to the element.
    const shadow = this.attachShadow({ mode: "open" });

    // Create a style element for the button.
    const style = document.createElement("style");
    style.textContent = `
      button {
        padding: 10px 20px;
        font-size: 16px;
        color: white;
        background-color: blue;
        border: none;
        border-radius: 5px;
        cursor: pointer;
      }
      button:hover {
        background-color: darkblue;
      }
    `;

    // Create a button element.
    this.button = document.createElement("button");
    this.button.textContent = this.getAttribute("label") || "Click me";

    // Append the style and button to the shadow root.
    shadow.appendChild(style);
    shadow.appendChild(this.button);

    // Add an event listener for the click event.
    this.button.addEventListener("click", this.handleClick.bind(this));
  }

  handleClick(event) {
    // Dispatch a custom event when the button is clicked.
    const clickEvent = new CustomEvent("my-button-click", {
      detail: { message: "Button clicked!" },
      bubbles: true,
      composed: true,
    });
    this.dispatchEvent(clickEvent);
  }

  static get observedAttributes() {
    return ["label"];
  }

  attributeChangedCallback(name, old, newVal) {
    if (name === "label") {
      this.button.textContent = newVal;
    }
  }
}

// Define the new element.
customElements.define("my-button", WebButton);
