import { LitElement, html, css } from 'https://cdn.jsdelivr.net/gh/lit/dist@2/core/lit-core.min.js';
import './data-provider.js';
import './data-manager.js';
import './character-card.js';
import './card-navigation.js';

class AppRoot extends LitElement {
  static properties = {
    character: { type: Array },
    characters: { type: Array },
    direction: { type: String },
    totalItems: { type: Number },
  };

  constructor() {
    super();
    this.characters = [];
    this.totalItems = 0;
  }

  handleDataLoaded(event) {
    this.characters = event.detail;
    this.totalItems = this.characters.length;
  }

  handleDirection(event) {
    this.direction = event.detail;
    this.shadowRoot.querySelector('data-manager').dispatchEvent(
      new CustomEvent(
        'direction-changed',
        {
          bubbles: true,
          composed: true,
          detail: this.direction
        }
      )
    );
  }

  updateCharacter(event) {
    this.character = event.detail;
  }

  render() {
    return html`
        <h1>Rick and Morty</h1>

        <data-provider 
          @data-loaded="${this.handleDataLoaded}">
        </data-provider>

        ${this.characters.length > 0
          ? html`
              <data-manager
                .characters="${this.characters}"
                .totalItems="${this.totalItems}"
                @update-character="${this.updateCharacter}">
              </data-manager>

              <character-card 
                .character="${this.character}">
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
