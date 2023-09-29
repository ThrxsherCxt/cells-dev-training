import { LitElement, html, css } from 'https://cdn.jsdelivr.net/gh/lit/dist@2/core/lit-core.min.js';
import './data-provider.js';
import './data-manager.js';
import './character-card.js';
import './card-navigation.js';

class AppRoot extends LitElement {
  static properties = {
    isDataLoaded: { type: Boolean },
  };

  constructor() {
    super();
    this.isDataLoaded = false;
  }

  handleDataLoaded(event) {
    this.isDataLoaded = true;

    // Need to perform update manually because the data-manager element does not currently exist because it is conditionally rendered by isDataLoaded
    this.requestUpdate();
    this.performUpdate();

    // Now the data-manager element is being rendered so it can be accessed
    const dataManager = this.shadowRoot.querySelector('data-manager');
    
    dataManager.characters = event.detail
    dataManager.totalItems = event.detail.length
  }

  handleDirection(event) {
    this.shadowRoot.querySelector('data-manager').handleDirection(event.detail)
  }

  updateCharacter(event) {
    this.shadowRoot.querySelector('character-card').character = event.detail;
  }

  render() {
    return html`
        <h1>Rick and Morty</h1>

        <data-provider 
          @data-loaded="${this.handleDataLoaded}">
        </data-provider>

        ${this.isDataLoaded
          ? html`
              <data-manager
                @update-character="${this.updateCharacter}">
              </data-manager>

              <character-card>
              </character-card>

              <card-navigation 
                @change-direction="${this.handleDirection}">
              </card-navigation>
              `
          : html`
              <h2>Cargando...</h2>
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
