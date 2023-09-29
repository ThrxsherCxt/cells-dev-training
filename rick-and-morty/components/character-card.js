import { LitElement, html, css } from 'https://cdn.jsdelivr.net/gh/lit/dist@2/core/lit-core.min.js';

class CharacterCard extends LitElement {
  static properties = {
    character: { type: Array },
  };

  constructor() {
    super();
  }

  render() {
    return html`
      <div class="card">
        ${this.character
          ? html`
              <img src="${this.character.image}"/>
              <div class="name">${this.character.name}</div>
              <div>Status: ${this.character.status}</div>
              <div>Gender: ${this.character.gender}</div>
              <div>Species: ${this.character.species}</div>
            `
          : ''}
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

    .card > .name{
      font-size: 26px;
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


    .card > img {
      border-radius:10px;
      width:100%;
      height:auto;
    }
  `;

}

customElements.define('character-card', CharacterCard);
