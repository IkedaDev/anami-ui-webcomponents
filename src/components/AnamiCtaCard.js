import { AnamiElement } from "../utils/AnamiElement.js";

export class AnamiCtaCard extends AnamiElement {
  static get observedAttributes() {
    return ["title", "text", "button-text", "image-url"];
  }
  constructor() {
    super();
  }
  connectedCallback() {
    this.render();
    // Llamar a attachListeners aquí es suficiente si render() no se usa para actualizaciones de estado.
  }

  // 2. Manejador de Eventos: Crea y emite el CustomEvent
  handleClick(event) {
    // Comprobamos que el elemento clickeado sea realmente el botón
    const button = event.currentTarget;

    const customEvent = new CustomEvent("cta-card-click", {
      detail: {
        // Puedes incluir información aquí si fuera necesario, como el título de la tarjeta
        title: this.getAttribute("title"),
        text: this.getAttribute("text"),
      },
      bubbles: true,
      composed: true,
    });

    // Emite el evento
    this.dispatchEvent(customEvent);
  }

  // 3. Adjuntar Listeners: Se llama después de cada renderizado
  attachListeners() {
    // CORRECCIÓN: Seleccionamos la etiqueta BUTTON, que tiene la clase .btn
    const button = this.shadowRoot.querySelector("button");

    // Verificamos que el botón exista antes de adjuntar el listener
    if (button) {
      button.addEventListener("click", this.handleClick.bind(this));
    }
  }

  render() {
    const title = this.getAttribute("title");
    const text = this.getAttribute("text");
    const btnText = this.getAttribute("button-text");
    const img = this.getAttribute("image-url");

    this.shadowRoot.innerHTML = `
${this.getStyles()}
<style>
:host { display: block; padding: 4rem 2rem; }
.cta-wrapper {
 position: relative;
 border-radius: var(--radius-lg);
 overflow: hidden;
 max-width: 1200px;
 margin: 0 auto;
 min-height: 450px;
 display: flex;
 align-items: center;
 box-shadow: var(--shadow-soft);
}

/* Fondo de imagen completo */
.bg-image {
 position: absolute;
 top: 0; left: 0; right: 0; bottom: 0;
 z-index: 1;
}
.bg-image img {
 width: 100%;
 height: 100%;
 object-fit: cover;
}

/* Panel de contenido flotante */
.panel {
 position: relative;
 z-index: 2;
 /* Usamos background transparente/blur */
 background: rgba(255, 255, 255, 0.85); 
 backdrop-filter: blur(10px);
 padding: 4rem;
 max-width: 450px; 
 width: 90%; /* Asegura que no se desborde */
 margin-left: 5%;
 border-radius: var(--radius-lg);
 box-shadow: 0 10px 30px rgba(0,0,0,0.05);
}

h3 {
 font-size: 2rem;
 font-weight: 300;
 margin: 0 0 1.5rem 0;
 color: var(--text-main);
}
p {
 color: var(--text-light);
 margin-bottom: 2.5rem;
 line-height: 1.7;
 font-weight: 300;
}
            
            /* Media Query para pantallas pequeñas */
@media (max-width: 768px) {
 .cta-wrapper { 
                flex-direction: column; 
                min-height: auto; 
                align-items: flex-start; 
              }
              
 .bg-image { 
                position: relative; 
                height: 250px; 
                width: 100%; 
                order: 1; 
              }
              
 .panel { 
                width: 100%; 
                max-width: none;
                margin: 0; 
                border-radius: var(--radius-lg); 
                padding: 3rem 2rem; 
                background: var(--anami-bg-surface); 
                backdrop-filter: none;
                order: 2;
                margin-top: -50px; 
                position: relative; 
              }
              
              h3 { font-size: 1.5rem; }
}
            
            @media (min-width: 769px) and (max-width: 1024px) {
              .panel {
                padding: 3rem; 
                max-width: 350px;
              }
            }
</style>
<div class="cta-wrapper">
<div class="bg-image">
 <img src="${img}" alt="Background">
</div>
<div class="panel">
 <h3>${title}</h3>
 <p>${text}</p>
 <button class="btn">${btnText}</button>
</div>
</div>
  `;

    // Adjuntamos los listeners después de renderizar el HTML
    this.attachListeners();
  }
}
customElements.define("anami-cta-card", AnamiCtaCard);
