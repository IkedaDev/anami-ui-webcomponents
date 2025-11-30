import { AnamiElement } from "../utils/AnamiElement.js";

export class AnamiServiceCardGrid extends AnamiElement {
  static get observedAttributes() {
    return ["services-json"];
  }

  constructor() {
    super();
    this.services = []; // Inicializamos el array de servicios
  }

  connectedCallback() {
    this.parseServices();
    this.render();
  }

  // 1. Manejo de Datos: Parsea y guarda el JSON en la propiedad 'services'
  parseServices() {
    const servicesJson = this.getAttribute("services-json") || "[]";
    try {
      this.services = JSON.parse(servicesJson);
    } catch (e) {
      console.error("Error al parsear el JSON de servicios:", e);
      this.services = [];
    }
  }

  // 2. Manejador de Eventos: Crea y emite el CustomEvent
  handleClick(event) {
    // Busca la tarjeta padre que tiene el índice
    const card = event.currentTarget.closest(".card");
    if (!card) return; // Salir si no se encuentra la tarjeta

    const index = parseInt(card.getAttribute("data-index"));

    if (index >= 0 && index < this.services.length) {
      const serviceData = this.services[index];

      // Creación del CustomEvent 'service-selected'
      const customEvent = new CustomEvent("service-selected", {
        detail: serviceData, // Datos completos del servicio seleccionado
        bubbles: true, // Permite que el evento suba por el Shadow DOM
        composed: true, // Permite que el evento cruce el límite del Shadow DOM
      });

      // Emite el evento
      this.dispatchEvent(customEvent);
    }
  }

  // 3. Adjuntar Listeners: Se llama después de cada renderizado
  attachListeners() {
    // Usamos 'querySelectorAll' y 'forEach' para adjuntar el listener a cada tarjeta
    const cards = this.shadowRoot.querySelectorAll(".card");
    cards.forEach((card) => {
      // Adjuntamos el manejador de click al componente (usando 'this.handleClick.bind(this)')
      card.addEventListener("click", this.handleClick.bind(this));
    });
  }

  render() {
    // Aseguramos que los servicios estén parseados antes de renderizar
    if (this.services.length === 0 && this.getAttribute("services-json")) {
      this.parseServices();
    }

    this.shadowRoot.innerHTML = `
      ${this.getStyles()}
      <style>
        :host { display: block; padding: 4rem 2rem; max-width: 1200px; margin: 0 auto; }

        .grid-title {
          text-align: center;
          font-size: 2.8rem;
          font-weight: 300;
          margin-bottom: 4rem;
          color: var(--text-main);
          letter-spacing: -0.02em;
        }
        .subtitle {
          display: block;
          color: var(--anami-brand-primary);
          text-transform: uppercase;
          letter-spacing: 3px;
          font-size: 0.8rem;
          font-weight: 500;
          margin-bottom: 0.5rem;
        }

        /* GRID Responsivo */
        .grid {
          display: grid;
          /* Mínimo de 340px por columna, se adapta a 1, 2 o 3 columnas */
          grid-template-columns: repeat(auto-fit, minmax(340px, 1fr));
          gap: 3rem;
        }

        .card {
          background: var(--bg-surface);
          padding: 2rem;
          border-radius: var(--anami-radius-lg);
          box-shadow: var(--anami-shadow-soft);
                    cursor: pointer; 
          transition: transform 0.3s ease, box-shadow 0.3s ease;
          border: 1px solid var(--anami-brand-secondary);
        }

        .card:hover {
          transform: translateY(-5px);
          box-shadow: 0 15px 30px rgba(74, 64, 58, 0.08);
        }

        .card-header {
          display: flex;
          justify-content: space-between;
          align-items: start;
          margin-bottom: 1.5rem;
          border-bottom: 1px dashed var(--anami-brand-secondary);
          padding-bottom: 1rem;
        }

        h4 {
          font-size: 1.5rem;
          font-weight: 400;
          margin: 0;
          color: var(--anami-brand-primary);
        }

        .duration {
          white-space: nowrap;
          font-size: 0.9rem;
          color: var(--text-light);
          background: var(--anami-brand-secondary);
          padding: 4px 12px;
          border-radius: 50px;
          font-weight: 500;
        }

        .description {
          font-size: 1rem;
          color: var(--text-light);
          line-height: 1.7;
          margin-bottom: 2rem;
        }

        .price {
          font-size: 1.8rem;
          font-weight: 500;
          color: var(--text-main);
        }
      </style>
      <h2 class="grid-title">
        <span class="subtitle">Servicios Destacados</span>
        Encuentra el masaje perfecto para ti
      </h2>
      <div class="grid">
        ${this.services
          .map(
            (service, index) => `
          <div class="card" data-index="${index}">
            <div class="card-header">
              <h4>${service.name}</h4>
              <span class="duration">${service.duration}</span>
            </div>
            <p class="description">${service.description}</p>
            <p class="price">${service.price}</p>
          </div>
        `
          )
          .join("")}
      </div>
    `;

    this.attachListeners();
  }
}
customElements.define("anami-service-card-grid", AnamiServiceCardGrid);
