class MyButton extends HTMLElement {
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
        border: none;
        border-radius: 5px;
        cursor: pointer;
        background-color: var(--button-bg-color, blue);
      }
      button:hover {
        background-color: var(--button-hover-bg-color, darkblue);
      }
      button.success {
        --button-bg-color: green;
        --button-hover-bg-color: darkgreen;
      }
      button.danger {
        --button-bg-color: red;
        --button-hover-bg-color: darkred;
      }
      button.primary {
        --button-bg-color: blue;
        --button-hover-bg-color: darkblue;
      }
    `;

    // Create a button element.
    this.button = document.createElement("button");
    this.button.textContent = this.getAttribute("label") || "Click me";

    // Set the initial variant class.
    const variant = this.getAttribute("variant") || "primary";
    this.button.classList.add(variant);

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
    return ["label", "variant"];
  }

  attributeChangedCallback(name, old, newVal) {
    if (name === "label") {
      this.button.textContent = newVal;
    } else if (name === "variant") {
      // Remove the old variant class if it exists.
      if (old) {
        this.button.classList.remove(old);
      }
      // Add the new variant class.
      this.button.classList.add(newVal);
    }
  }
}

// Define the new element.
customElements.define("my-button", MyButton);
