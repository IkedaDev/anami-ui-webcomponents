import { AnamiElement } from "../utils/AnamiElement.js";

export class AnamiBio extends AnamiElement {
  static get observedAttributes() {
    return ["name", "subtitle", "description", "image-url"];
  }
  constructor() {
    super();
  }
  connectedCallback() {
    this.render();
  }
  render() {
    const name = this.getAttribute("name");
    const subtitle = this.getAttribute("subtitle") || "";
    const desc = this.getAttribute("description");
    const img = this.getAttribute("image-url");

    this.shadowRoot.innerHTML = `
                    ${this.getStyles()}
                    <style>
                        .section {
                            padding: 6rem 2rem;
                            max-width: 1100px;
                            margin: 0 auto;
                        }
                        .container {
                            display: grid;
                            grid-template-columns: 1fr 1.2fr;
                            gap: 5rem;
                            align-items: center;
                        }
                        
                        .image-area {
                            position: relative;
                        }
                        .blob-underlay {
                            position: absolute;
                            top: -20px;
                            left: -20px;
                            width: 100%;
                            height: 100%;
                            background: var(--brand-blob);
                            z-index: -1;
                            border-radius: 30% 70% 70% 30% / 30% 30% 70% 70%;
                            transform: scale(1.1) rotate(-5deg);
                        }
                        img {
                            width: 100%;
                            border-radius: var(--radius-lg);
                            box-shadow: var(--shadow-soft);
                            display: block;
                        }

                        .text-area { padding-top: 2rem; }
                        h2 {
                            font-size: 2.5rem;
                            font-weight: 300;
                            margin: 0 0 0.5rem 0;
                            color: var(--text-main);
                        }
                        .subtitle {
                            display: block;
                            color: var(--brand-primary);
                            text-transform: uppercase;
                            letter-spacing: 2px;
                            font-size: 0.8rem;
                            margin-bottom: 2rem;
                            font-weight: 500;
                        }
                        p {
                            color: var(--text-light);
                            font-size: 1.05rem;
                            line-height: 1.8;
                            margin-bottom: 2rem;
                            font-weight: 300;
                        }
                        .signature {
                            font-family: 'Times New Roman', serif;
                            font-style: italic;
                            font-size: 1.5rem;
                            color: var(--text-main);
                        }

                        @media (max-width: 768px) {
                            .container { grid-template-columns: 1fr; gap: 3rem; }
                            .image-area { width: 80%; margin: 0 auto; }
                            .text-area { text-align: center; }
                        }
                    </style>
                    <div class="section">
                        <div class="container">
                            <div class="image-area">
                                <div class="blob-underlay"></div>
                                <img src="${img}" alt="${name}">
                            </div>
                            <div class="text-area">
                                <h2>${name}</h2>
                                <span class="subtitle">${subtitle}</span>
                                <p>${desc}</p>
                                <div class="signature">Anette L.</div>
                            </div>
                        </div>
                    </div>
                `;
  }
}
customElements.define("anami-bio", AnamiBio);
