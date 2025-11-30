export class AnamiElement extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }
  getStyles() {
    return `
                    <style>
                        :host {
                            display: block;
                            font-family: var(--anami-font-main, sans-serif);
                            --text-main: var(--anami-text-main, #4A403A);
                            --text-light: var(--anami-text-light, #8C817C);
                            --brand-primary: var(--anami-brand-primary, #C47F6B);
                            --brand-secondary: var(--anami-brand-secondary, #E8D3CD);
                            --brand-blob: var(--anami-brand-blob, #F9EBE7);
                            --bg-surface: var(--anami-bg-surface, #FFFFFF);
                            --shadow-soft: var(--anami-shadow-soft);
                            --radius-lg: var(--anami-radius-lg, 24px);
                        }
                        * { box-sizing: border-box; }
                        
                        /* Utilidad de botón común para consistencia */
                        .btn {
                            display: inline-block;
                            padding: 12px 32px;
                            background-color: var(--brand-primary);
                            color: white;
                            text-decoration: none;
                            border-radius: 50px;
                            font-weight: 400;
                            letter-spacing: 0.5px;
                            font-size: 0.95rem;
                            transition: all 0.3s ease;
                            border: none;
                            cursor: pointer;
                            box-shadow: 0 4px 10px rgba(196, 127, 107, 0.2);
                        }
                        .btn:hover {
                            background-color: #A66654;
                            transform: translateY(-2px);
                            box-shadow: var(--anami-shadow-hover);
                        }
                        .btn-outline {
                            background: transparent;
                            border: 1px solid var(--brand-primary);
                            color: var(--brand-primary);
                            box-shadow: none;
                        }
                        .btn-outline:hover {
                            background: var(--brand-primary);
                            color: white;
                        }
                    </style>
                `;
  }
}
