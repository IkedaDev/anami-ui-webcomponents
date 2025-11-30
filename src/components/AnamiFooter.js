import { AnamiElement } from "../utils/AnamiElement.js";

/* 5. FOOTER: Simple y limpio */
export class AnamiFooter extends AnamiElement {
  static get observedAttributes() {
    return ["text"];
  }
  constructor() {
    super();
  }
  connectedCallback() {
    this.render();
  }
  render() {
    const text = this.getAttribute("text") || "";
    this.shadowRoot.innerHTML = `
                    ${this.getStyles()}
                    <style>
                        footer {
                            background-color: #F5F0EE; /* Gris muy cálido */
                            color: var(--text-light);
                            padding: 3rem 2rem;
                            text-align: center;
                            font-size: 0.9rem;
                            margin-top: 4rem;
                        }
                    </style>
                    <footer>${text}</footer>
                `;
  }
}
customElements.define("anami-footer", AnamiFooter);
