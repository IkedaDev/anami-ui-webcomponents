import { AnamiElement } from "../utils/AnamiElement.js";

export class AnamiHero extends AnamiElement {
  static get observedAttributes() {
    return ["title", "subtitle", "image-url"];
  }
  constructor() {
    super();
  }
  connectedCallback() {
    this.render();
  }
  render() {
    const title = this.getAttribute("title");
    const subtitle = this.getAttribute("subtitle");
    const img = this.getAttribute("image-url");
    this.shadowRoot.innerHTML = `
                    ${this.getStyles()}
                    <style>
                        .hero {
                            display: grid;
                            grid-template-columns: 1.1fr 0.9fr;
                            align-items: center;
                            min-height: 85vh;
                            max-width: 1300px;
                            margin: 0 auto;
                            padding: 0 2rem;
                            position: relative;
                        }
                        .content {
                            padding-right: 4rem;
                            z-index: 2;
                        }
                        h1 {
                            font-size: 4.5rem;
                            font-weight: 300;
                            line-height: 1.05;
                            margin: 0 0 1.5rem 0;
                            color: var(--text-main);
                            letter-spacing: -0.02em;
                        }
                        /* Acento en la primera palabra o estilo */
                        h1 span {
                            display: block;
                            font-weight: 200;
                            font-style: italic;
                            font-family: 'Times New Roman', serif; /* Toque clásico editorial */
                            font-size: 0.6em;
                            margin-bottom: 0.2em;
                            color: var(--brand-primary);
                        }
                        p {
                            font-size: 1.1rem;
                            color: var(--text-light);
                            max-width: 450px;
                            line-height: 1.7;
                            margin-bottom: 2.5rem;
                            font-weight: 300;
                        }
                        
                        /* Imagen con forma orgánica sutil */
                        .image-wrapper {
                            position: relative;
                            height: 650px;
                            width: 100%;
                        }
                        img {
                            width: 100%;
                            height: 100%;
                            object-fit: cover;
                            border-radius: 200px 200px 0 0; /* Arco tipo ventana */
                        }
                        
                        /* Elemento decorativo flotante */
                        .badge {
                            position: absolute;
                            bottom: 80px;
                            left: -40px;
                            background: white;
                            padding: 20px;
                            border-radius: 50%;
                            width: 120px;
                            height: 120px;
                            display: flex;
                            align-items: center;
                            justify-content: center;
                            text-align: center;
                            box-shadow: var(--shadow-soft);
                            font-size: 0.8rem;
                            color: var(--brand-primary);
                            transform: rotate(-10deg);
                        }

                        @media (max-width: 900px) {
                            .hero { grid-template-columns: 1fr; gap: 3rem; text-align: center; padding-top: 2rem;}
                            .content { padding-right: 0; margin: 0 auto;}
                            h1 { font-size: 3rem; }
                            p { margin: 0 auto 2rem auto; }
                            .image-wrapper { height: 400px; width: 90%; margin: 0 auto; }
                            .badge { display: none; }
                            img { border-radius: 150px 150px 0 0; }
                        }
                    </style>
                    <section class="hero">
                        <div class="content">
                            <h1><span>Natural</span>${title}</h1>
                            <p>${subtitle}</p>
                            <a href="#" class="btn">Conoce más</a>
                        </div>
                        <div class="image-wrapper">
                            <img src="${img}" alt="Hero">
                            <div class="badge">Relax &<br>Renew</div>
                        </div>
                    </section>
                `;
  }
}
customElements.define("anami-hero", AnamiHero);
