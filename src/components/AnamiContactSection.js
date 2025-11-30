import { AnamiElement } from "../utils/AnamiElement.js";

export class AnamiContactSection extends AnamiElement {
  static get observedAttributes() {
    return ["phone", "email", "instagram", "address"];
  }

  constructor() {
    super();
  }

  connectedCallback() {
    this.render();
  }

  render() {
    const phone = this.getAttribute("phone") || "+56 9 0000 0000";
    const email = this.getAttribute("email") || "contacto@ejemplo.com";
    const instagram = this.getAttribute("instagram") || "@usuario";
    const address = this.getAttribute("address") || "Dirección Comercial";

    // Limpiamos los datos para usarlos en los enlaces href
    const phoneHref = phone.replace(/\s+/g, "");
    const instaHref = instagram.replace("@", "");

    this.shadowRoot.innerHTML = `
      ${this.getStyles()}
      <style>
        :host { display: block; padding: 4rem 2rem; background-color: var(--bg-surface); }
        
        .contact-container {
            max-width: 1000px;
            margin: 0 auto;
            text-align: center;
        }

        h2 {
            font-size: 2.5rem;
            font-weight: 300;
            color: var(--text-main);
            margin-bottom: 3.5rem;
        }

        .grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
            gap: 2.5rem;
            justify-items: center;
        }

        .item {
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 1rem;
            padding: 1.5rem;
            width: 100%;
            transition: transform 0.3s ease;
        }
        
        .item:hover {
            transform: translateY(-5px);
        }

        .icon-box {
            width: 64px;
            height: 64px;
            background-color: var(--anami-brand-blob, #F9EBE7);
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            color: var(--anami-brand-primary, #C47F6B);
            margin-bottom: 0.5rem;
            box-shadow: var(--anami-shadow-soft);
        }

        .icon-box svg {
            width: 28px;
            height: 28px;
        }

        h3 {
            font-size: 0.95rem;
            font-weight: 600;
            margin: 0;
            color: var(--text-main);
            text-transform: uppercase;
            letter-spacing: 1.5px;
        }

        p, a {
            font-size: 1.05rem;
            color: var(--text-light);
            text-decoration: none;
            margin: 0;
            font-weight: 300;
            transition: color 0.3s;
        }

        a:hover {
            color: var(--anami-brand-primary);
        }
      </style>

      <div class="contact-container">
        <h2>Contacto</h2>
        <div class="grid">
            <!-- Phone -->
            <div class="item">
                <div class="icon-box">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
                </div>
                <h3>Teléfono</h3>
                <a href="tel:${phoneHref}">${phone}</a>
            </div>

            <!-- Email -->
            <div class="item">
                <div class="icon-box">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
                </div>
                <h3>Correo</h3>
                <a href="mailto:${email}">${email}</a>
            </div>

            <!-- Instagram -->
            <div class="item">
                <div class="icon-box">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
                </div>
                <h3>Instagram</h3>
                <a href="https://instagram.com/${instaHref}" target="_blank">${instagram}</a>
            </div>

            <!-- Address -->
            <div class="item">
                <div class="icon-box">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
                </div>
                <h3>Ubicación</h3>
                <p>${address}</p>
            </div>
        </div>
      </div>
    `;
  }
}
customElements.define("anami-contact-section", AnamiContactSection);
