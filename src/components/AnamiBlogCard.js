import { AnamiElement } from "../utils/AnamiElement.js";

export class AnamiBlogCard extends AnamiElement {
  static get observedAttributes() {
    return ["title", "excerpt", "category", "date", "image", "href"];
  }

  constructor() {
    super();
  }

  connectedCallback() {
    this.render();
  }

  render() {
    const title = this.getAttribute("title") || "Título del Artículo";
    const excerpt = this.getAttribute("excerpt") || "";
    const category = this.getAttribute("category") || "General";
    const date = this.getAttribute("date") || "";
    const image = this.getAttribute("image") || "";
    const href = this.getAttribute("href") || "#";

    this.shadowRoot.innerHTML = `
      ${this.getStyles()}
      <style>
        :host { display: block; }
        
        .card {
            background: transparent;
            border-top-right-radius: var(--anami-radius-lg);
            border-top-left-radius: var(--anami-radius-lg);
            overflow: hidden;
            transition: transform 0.3s ease;
            display: flex;
            flex-direction: column;
            text-decoration: none;
            height: 100%; /* Asegura que todas las tarjetas en un grid tengan altura completa */
        }
        
        .card:hover {
            transform: translateY(-5px);
        }
        
        .card-img {
            height: 220px;
            width: 100%;
            overflow: hidden;
            border-radius: var(--anami-radius-lg);
            margin-bottom: 1.5rem;
            background-color: #f0f0f0; /* Placeholder color */
        }
        
        .card-img img {
            width: 100%;
            height: 100%;
            object-fit: cover;
            transition: transform 0.5s ease;
        }
        
        .card:hover .card-img img {
            transform: scale(1.05);
        }

        .card-content {
            display: flex;
            flex-direction: column;
            flex-grow: 1; /* Empuja el contenido para llenar altura */
        }

        .card-meta {
            display: flex;
            gap: 1rem;
            font-size: 0.85rem;
            color: var(--anami-text-light);
            margin-bottom: 0.8rem;
            text-transform: uppercase;
            letter-spacing: 1px;
            font-weight: 500;
        }
        
        .category {
            color: var(--anami-brand-primary);
        }

        h3 {
            font-size: 1.4rem;
            font-weight: 400;
            margin: 0 0 1rem 0;
            color: var(--anami-text-main);
            line-height: 1.3;
        }

        .excerpt {
            color: var(--anami-text-light);
            font-size: 1rem;
            line-height: 1.6;
            margin-bottom: 1.5rem;
            display: -webkit-box;
            -webkit-line-clamp: 2; /* Limita a 2 líneas */
            -webkit-box-orient: vertical;
            overflow: hidden;
        }

        .read-more {
            margin-top: auto; /* Empuja este elemento al final de la tarjeta */
            color: var(--anami-brand-primary);
            text-decoration: none;
            font-weight: 500;
            font-size: 0.95rem;
            display: inline-flex;
            align-items: center;
            gap: 0.5rem;
            transition: gap 0.3s ease;
        }
        
        .card:hover .read-more {
            gap: 0.8rem;
        }
      </style>
      
      <a href="${href}" class="card">
        <div class="card-img">
            ${image ? `<img src="${image}" alt="${title}">` : ""}
        </div>
        <div class="card-content">
            <div class="card-meta">
                <span class="category">${category}</span>
                ${date ? `<span>•</span><span>${date}</span>` : ""}
            </div>
            <h3>${title}</h3>
            <div class="excerpt">${excerpt}</div>
            <span class="read-more">
                Leer artículo
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
            </span>
        </div>
      </a>
    `;
  }
}
customElements.define("anami-blog-card", AnamiBlogCard);
