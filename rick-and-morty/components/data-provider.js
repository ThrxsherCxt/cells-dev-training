import { LitElement } from 'https://cdn.jsdelivr.net/gh/lit/dist@2/core/lit-core.min.js';

class DataProvider extends LitElement {

    static properties() {
        charactersData: { type: Array }
    };

    constructor() {
        super();
        this.charactersData = [];
        this.endpoint = new URL('https://rickandmortyapi.com/api/character/');
    }

    async fetchCharacters() {

        try {
            const response = await fetch(this.endpoint);
            if (!response.ok) {
                throw new Error('Error al obtener los personajes');
            }
            const data = await response.json();
            this.charactersData = data.results;
        } catch (error) {
            console.error(error);
        }

        this.dispatchEvent(
            new CustomEvent(
                'data-loaded',
                {
                    bubbles: true,
                    composed: true,
                    detail: this.charactersData
                }
            )
        );

    }

    connectedCallback() {
        super.connectedCallback();
        this.fetchCharacters();
    }

}

customElements.define('data-provider', DataProvider);