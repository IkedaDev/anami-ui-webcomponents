import { AnamiElement } from "../utils/AnamiElement.js";

/* 6. WHATSAPP */
export class AnamiWhatsapp extends AnamiElement {
  static get observedAttributes() {
    return ["phone"];
  }
  constructor() {
    super();
  }
  connectedCallback() {
    this.render();
  }
  render() {
    const phone = this.getAttribute("phone");
    this.shadowRoot.innerHTML = `
                    <style>
                        .wa-float {
                            position: fixed;
                            bottom: 30px;
                            right: 30px;
                            background-color: #25D366;
                            color: white;
                            width: 64px;
                            height: 64px;
                            border-radius: 50%;
                            display: flex;
                            align-items: center;
                            justify-content: center;
                            box-shadow: 0 4px 20px rgba(37, 211, 102, 0.4);
                            cursor: pointer;
                            z-index: 1000;
                            transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
                        }
                        .wa-float:hover { transform: scale(1.1); box-shadow: 0 10px 25px rgba(37, 211, 102, 0.5); }
                        svg { width: 34px; height: 34px; fill: white; }
                    </style>
                    <a href="https://wa.me/${phone}" target="_blank" class="wa-float">
                        <svg viewBox="0 0 32 32"><path d="M16 2C8.268 2 2 8.268 2 16c0 2.476.643 4.814 1.777 6.85L2.6 29.4l6.65-1.74C11.186 28.357 13.524 29 16 29c7.732 0 14-6.268 14-14S23.732 2 16 2zm0 24.5c-2.18 0-4.24-.567-6.04-1.556l-.433-.238-3.77.986.996-3.675-.24-.44C5.568 20.24 5 18.18 5 16c0-6.065 4.935-11 11-11s11 4.935 11 11-4.935 11-11 11z"/></svg>
                    </a>
                `;
  }
}
customElements.define("anami-whatsapp", AnamiWhatsapp);
