import { LitElement, html, css } from 'https://cdn.jsdelivr.net/gh/lit/dist@2/core/lit-core.min.js';
import './data-manager.js';
import './character-card.js';
import './card-navigator.js';

class AppRoot extends LitElement {

    static properties = {
        dataManager: { type: Object },
        isLoading: { type: Boolean },
    };

    constructor() {
        super();
        this.isLoading = true;
        this.dataManager = document.createElement('data-manager');
    }

    connectedCallback(){
        super.connectedCallback();
        this.dataManager.connectedCallback();

        this.dataManager.addEventListener('loading-updated', (event) => {
            this.isLoading = event.detail;
            this.requestUpdate();
        });

    }

    render() {
        return html`
          <h1>Pokédex</h1>
          ${this.isLoading
            ? html`<h2>Cargando...</h2>`
            : html`
                <character-card .dataManager=${this.dataManager}></character-card>
                <card-navigator .dataManager=${this.dataManager}></card-navigator>
              `
          }
        `;
      }

    static styles = css`
      :host {
        font-family: 'Plus Jakarta Sans';
      }

      h1{
        margin: 0 auto;
        text-align: center;
        margin: 35px;
        font-size:55px;
      }

      h2{
        margin: 0 auto;
        text-align: center;
        margin: 100px auto 0 auto;
        font-size:40px;
      }

    `;
}

customElements.define('app-root', AppRoot);