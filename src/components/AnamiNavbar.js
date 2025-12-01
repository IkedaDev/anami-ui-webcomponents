import { AnamiElement } from "../utils/AnamiElement.js";

export class AnamiNavbar extends AnamiElement {
  static get observedAttributes() {
    return ["logo", "links"];
  }

  constructor() {
    super();
    this.menuOpen = false; // Estado interno para el menú móvil
  }

  connectedCallback() {
    // Solo llamamos a render aquí por primera vez
    this.render();
  }

  // Método para adjuntar los listeners después de cada renderizado
  attachListeners() {
    // Quitamos los listeners viejos para evitar duplicados, si es que existen.
    // Aunque la recreación de innerHTML en render() generalmente se encarga de esto.

    // Listener principal del botón de menú
    const menuButton = this.shadowRoot.querySelector(".menu-btn");
    if (menuButton) {
      menuButton.addEventListener("click", this.toggleMenu.bind(this));
    }

    // Listener para cerrar menú al hacer click en un enlace
    this.shadowRoot.querySelectorAll(".links a").forEach((link) => {
      link.addEventListener("click", () => {
        if (this.menuOpen) {
          this.toggleMenu();
        }
      });
    });
  }

  // No necesitamos disconnectedCallback porque los listeners se re-adjuntan o se destruyen con innerHTML.

  toggleMenu() {
    this.menuOpen = !this.menuOpen;
    this.render(); // Redibuja el componente para aplicar el nuevo estado CSS/HTML
  }

  render() {
    const logo = this.getAttribute("logo") || "Logo";
    const links = JSON.parse(this.getAttribute("links") || "[]");

    // Aplica la clase 'open' basada en el estado
    const menuClass = this.menuOpen ? "links open" : "links";

    this.shadowRoot.innerHTML = `
            ${this.getStyles()}
            <style>
                :host {
                    position: sticky;
                    top: 0;
                    z-index: 100;
                    transition: all 0.3s ease;
                    border-bottom: 1px solid var(--anami-brand-secondary, #E8D3CD); /* Línea sutil */
                    background: rgba(255, 252, 250, 0.95); /* Menos opaco para el blur */
                }
                nav {
                    backdrop-filter: blur(8px);
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    padding: 1.2rem 3rem;
                    max-width: 1300px;
                    margin: 0 auto;
                }
                .logo {
                    font-size: 1.4rem;
                    font-weight: 500;
                    color: var(--text-main);
                    text-decoration: none;
                    letter-spacing: -0.03em;
                    z-index: 101; /* Asegura que el logo esté sobre el menú móvil */
                }
                .links { 
                    display: flex; 
                    gap: 2.5rem; 
                    align-items: center;
                }
                a {
                    text-decoration: none;
                    color: var(--text-main);
                    font-size: 0.95rem;
                    font-weight: 300;
                    position: relative;
                    transition: color 0.3s;
                }
                a::after {
                    content: '';
                    position: absolute;
                    bottom: -4px;
                    left: 0;
                    width: 0;
                    height: 1px;
                    background: var(--brand-primary);
                    transition: width 0.3s ease;
                }
                a:hover { color: var(--brand-primary); }
                a:hover::after { width: 100%; }

                .menu-btn { 
                    display: none; 
                    background: none; 
                    border: none; 
                    cursor: pointer; 
                    color: var(--text-main); 
                    padding: 0;
                    z-index: 101;
                }

                /* --- MEDIA QUERIES (Responsividad) --- */
                @media (max-width: 768px) {
                    nav { padding: 1rem 1.5rem; }
                    
                    .links { 
                        display: none; /* Oculto por defecto en móvil (aunque open lo sobreescribe) */
                        
                        /* Posicionamiento del menú colapsable */
                        position: absolute;
                        top: 0;
                        left: 0;
                        width: 100%;
                        height: 100vh; 
                        flex-direction: column;
                        justify-content: center;
                        background: var(--bg-surface);
                        transition: transform 0.3s ease-out;
                        transform: translateX(-100%);
                        box-shadow: 0 0 20px rgba(0,0,0,0.1);
                    }
                    
                    /* Estado Abierto */
                    .links.open {
                        display: flex; /* Necesario para anular el display: none */
                        transform: translateX(0);
                    }

                    .links a {
                        font-size: 1.5rem;
                        padding: 1rem 0;
                        font-weight: 400;
                    }
                    .links a::after {
                        height: 2px;
                        background: var(--brand-primary);
                    }

                    .menu-btn { 
                        display: block; 
                    }
                }
            </style>
            <nav>
                <a href="#" class="logo">${logo}</a>
                <div class="${menuClass}">
                    ${links
                      .map((link) => `<a href="${link.href}">${link.text}</a>`)
                      .join("")}
                </div>
                <button class="menu-btn" aria-expanded="${
                  this.menuOpen ? "true" : "false"
                }" aria-label="Toggle navigation">
                    <!-- Icono de hamburguesa o cerrar -->
                    ${
                      this.menuOpen
                        ? `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>`
                        : `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>`
                    }
                </button>
            </nav>
        `;

    // Llama a adjuntar los listeners justo después de que el HTML está en el DOM
    this.attachListeners();
  }
}
customElements.define("anami-navbar", AnamiNavbar);
