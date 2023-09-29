import { LitElement, html, css } from 'https://cdn.jsdelivr.net/gh/lit/dist@2/core/lit-core.min.js';

class CardNavigation extends LitElement {

  static properties = {
    direction: { type: String }
  }

  constructor() {
    super();
    this.direction = '';
  }

  handleNavigation(direction) {

    this.direction = direction;

    this.dispatchEvent(
      new CustomEvent(
        'change-direction',
        {
          bubbles: true,
          composed: true,
          detail: this.direction
        }
      )
    );

  }

  render() {
    return html`
      <div class="buttons-container">
        <button @click="${ () => this.handleNavigation('previous') }">Anterior</button>
        <button @click="${ () => this.handleNavigation('next') }">Siguiente</button>
      </div>
    `;
  }

  static styles = css`
    .buttons-container {
        margin: 0 auto;
        text-align: center;
    }

    button{
        background-color: black;
        color:white;
        border-radius: 15px;
        margin: 15px;
        padding: 10px 20px;
        font-size: 20px;
        cursor: pointer;
    }

  `;

}

customElements.define('card-navigation', CardNavigation);
