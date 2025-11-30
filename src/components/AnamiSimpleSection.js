import { AnamiElement } from "../utils/AnamiElement.js";

export class AnamiSimpleSection extends AnamiElement {
  static get observedAttributes() {
    return ["title", "description", "image-url", "features-json"];
  }

  constructor() {
    super();
  }

  connectedCallback() {
    this.render();
  }

  render() {
    const title = this.getAttribute("title") || "Servicios";
    const description = this.getAttribute("description") || "";
    const img = this.getAttribute("image-url") || "";
    const featuresJson = this.getAttribute("features-json") || "[]";
    let features = [];
    try {
      features = JSON.parse(featuresJson);
    } catch (e) {
      features = [];
    }

    this.shadowRoot.innerHTML = `
      ${this.getStyles()}
      <style>
        :host { display: block; padding: 6rem 2rem; background: var(--bg-surface); }
        .container {
            max-width: 1200px;
            margin: 0 auto;
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 5rem;
            align-items: center;
        }
        
        /* Columna Izquierda: Imagen */
        .image-wrapper {
            position: relative;
            height: 550px;
            border-radius: var(--anami-radius-lg);
            overflow: hidden;
            box-shadow: var(--anami-shadow-soft);
        }
        .image-wrapper::after {
            content: '';
            position: absolute;
            top: 0; left: 0; right: 0; bottom: 0;
            background: rgba(0,0,0,0.05); /* Sutil overlay para contraste */
        }
        img {
            width: 100%;
            height: 100%;
            object-fit: cover;
            transition: transform 0.5s ease;
        }
        .image-wrapper:hover img {
            transform: scale(1.02);
        }
        
        /* Columna Derecha: Contenido */
        .content {
            display: flex;
            flex-direction: column;
            gap: 2rem;
            padding-left: 1rem;
        }
        h2 {
            font-size: 3.5rem;
            font-weight: 300;
            margin: 0;
            color: var(--text-main);
            line-height: 1.1;
            letter-spacing: -0.02em;
        }
        p {
            font-size: 1.05rem;
            line-height: 1.8;
            color: var(--text-light);
            font-weight: 300;
            margin: 0;
            max-width: 500px;
        }

        /* Fila de Iconos */
        .features {
            display: flex;
            gap: 3rem;
            margin-top: 2rem;
            border-top: 1px solid rgba(0,0,0,0.05);
            padding-top: 2rem;
        }
        .feature-item {
            display: flex;
            flex-direction: column;
            align-items: center;
            text-align: center;
            gap: 1rem;
        }
        .icon-box {
            width: 56px;
            height: 56px;
            color: var(--anami-brand-primary); /* Terracota para los iconos */
            transition: transform 0.3s ease;
        }
        .feature-item:hover .icon-box {
            transform: translateY(-5px);
        }
        .icon-box svg {
            width: 100%;
            height: 100%;
            stroke-width: 1.2;
            fill: none;
            stroke: currentColor;
        }
        .feature-label {
            font-size: 0.8rem;
            text-transform: uppercase;
            letter-spacing: 1.5px;
            color: var(--text-light);
            font-weight: 500;
        }

        @media (max-width: 900px) {
            .container { grid-template-columns: 1fr; gap: 3rem; }
            .image-wrapper { height: 350px; order: -1; } /* Imagen arriba en móvil */
            .content { padding-left: 0; text-align: center; align-items: center;}
            h2 { font-size: 2.5rem; }
            .features { justify-content: center; gap: 2rem; width: 100%; }
        }
        @media (max-width: 480px) {
            .features { gap: 1rem; }
            .icon-box { width: 40px; height: 40px; }
            .feature-label { font-size: 0.7rem; }
        }
      </style>
      <div class="container">
        <div class="image-wrapper">
             <img src="${img}" alt="Hotel Services">
        </div>
        <div class="content">
            <h2>${title}</h2>
            <p>${description}</p>
            
            <div class="features">
                ${features
                  .map(
                    (f) => `
                    <div class="feature-item">
                        <div class="icon-box">
                            ${this.getIconSvg(f.icon)}
                        </div>
                        <span class="feature-label">${f.label}</span>
                    </div>
                `
                  )
                  .join("")}
            </div>
        </div>
      </div>
    `;
  }

  getIconSvg(name) {
    const icons = {
      // Icono 1: Botella con bomba y botella alta (Renovación)
      renovacion: `
            <svg viewBox="0 0 48 48">
              <!-- Botella alta derecha -->
              <path d="M30 14h6v6l2 4v16a2 2 0 0 1-2 2H26a2 2 0 0 1-2-2V24l2-4v-6h4" />
              <path d="M30 14V8h6v6" />
              <rect x="29" y="4" width="8" height="4" rx="1" />
              <circle cx="36" cy="32" r="2" />
              <circle cx="32" cy="38" r="1.5" />
              <!-- Botella con bomba izquierda (superpuesta) -->
              <rect x="8" y="24" width="18" height="16" rx="3" fill="var(--bg-surface)" stroke="currentColor" stroke-width="1.5"/>
              <path d="M17 24v-6" />
              <path d="M17 18h-4" />
              <rect x="10" y="14" width="6" height="4" rx="1" />
              <path d="M11 32h12" opacity="0.5"/>
            </svg>
          `,

      // Icono 2: Flor de Loto Geométrica (Alivio)
      alivio: `
            <svg viewBox="0 0 48 48">
              <!-- Pétalo central -->
              <path d="M24 8c0 0 6 6 6 14s-6 8-6 8s-6 0-6-8s6-14 6-14z" />
              <!-- Pétalos laterales superiores -->
              <path d="M30 22l8-4-2 10s-2 4-6 6" />
              <path d="M18 22l-8-4 2 10s2 4 6 6" />
              <!-- Pétalos laterales inferiores/base -->
              <path d="M34 34c0 0 4 2 4 4s-6 2-8 0" />
              <path d="M14 34c0 0-4 2-4 4s6 2 8 0" />
              <path d="M24 30c0 0 3 6 0 10c-3-4 0-10 0-10z" />
            </svg>
          `,

      // Icono 3: Manos sosteniendo Corazón con cruz (Vitalidad)
      vitalidad: `
            <svg viewBox="0 0 48 48">
              <!-- Ajuste de coordenadas: Mueve el corazón un poco hacia abajo -->
              <path d="M24 18c-4-5-10-5-13 0-2.5 4-1 9 4 14l9 9 9-9c5-5 6.5-10 4-14-3-5-9-5-13 0z" />
              <!-- Cruz central (ajustada para centrarse con el corazón movido) -->
              <path d="M24 21v6" />
              <path d="M21 24h6" />
            </svg>
          `,
    };

    return icons[name.toLowerCase()] || icons["renovacion"];
  }
}
customElements.define("anami-simple-section", AnamiSimpleSection);
