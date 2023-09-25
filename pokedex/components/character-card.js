import { LitElement, html, css } from 'https://cdn.jsdelivr.net/gh/lit/dist@2/core/lit-core.min.js';

class CharacterCard extends LitElement {
  static properties = {
    dataManager: { type: Object },
    id: { type: String },
    name: { type: String },
    sprite: { type: String }
  };

  constructor() {
    super();
  }

  connectedCallback() {
    super.connectedCallback();
    this.dataManager.addEventListener('fill-card', this.updateCard);
    this.dataManager.updateCharacter();
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this.dataManager.removeEventListener('fill-card', this.updateCard);
  }

  updateCard = (event) => {
    const character = event.detail;
    this.id = character.id.toString().padStart(3, 0);
    this.name = character.name.toUpperCase();
    this.sprite = character.sprites.other['official-artwork'].front_default;
    this.requestUpdate();
  };

  render() {
    return html`
      <div class="card">
        <img src="${this.sprite}"/>
        <div class="number"># ${this.id}</div>
        <div class="name">${this.name}</div>
      </div>
    `;
  }

  static styles = css`
    .card {
     margin: 0 auto;
     max-width:300px;
     height:auto;
     aspect-ratio:1/1;
     padding: 25px;
     border-radius:15px;
     border: 1px solid black;
    }

    .card > div{
      text-align: center;
      margin: 0 auto;
      font-weight: bold;
    }

    .card > .number{
      border-radius:10px;
      border: 1px solid black;
      width: auto;
      padding:5px;
      margin: 0 auto;
      margin-bottom: 20px;
      background-color: black;
      color: white;
      font-size: 18px;
    }

    .card > .name{
      font-size: 26px;
    }

    .card > img {
      width:100%;
      height:auto;
    }
  `;
}

customElements.define('character-card', CharacterCard);