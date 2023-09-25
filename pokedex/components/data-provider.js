import { LitElement } from 'https://cdn.jsdelivr.net/gh/lit/dist@2/core/lit-core.min.js';

class DataProvider extends LitElement {

  static properties() {
    charactersData: { type: Array }
  };

  constructor() {
    super();
    this.charactersData = [];
    this.endpoint = new URL('https://pokeapi.co/api/v2/pokemon/');
    this.maxItems = 19;
  }

  async fetchCharacters() {

    for(let i = 0; i <= this.maxItems; i++){
        try {
          const response = await fetch(`${this.endpoint}${i+1}`);
          if (!response.ok) {
            throw new Error('Error al obtener los personajes');
          }
          this.charactersData.push(await response.json());
        } catch (error) {
          console.error(error);
        }
    }

  }

  async connectedCallback() {
    super.connectedCallback();

    try {
        await this.fetchCharacters();
    } catch (error) {
        console.error(error);
    }

    this.dispatchEvent(new CustomEvent('api-data-provider',
        { detail: { data: this.charactersData, maxItems : this.maxItems } }
    ));

  }

}

customElements.define('data-provider', DataProvider);