import { LitElement, html } from 'https://cdn.jsdelivr.net/gh/lit/dist@2/core/lit-core.min.js';
import './data-provider.js';

class DataManager extends LitElement {
  static properties = {
    data: { type: Array },
    maxItems: { type: Number },
    isLoading: { type: Boolean }
  };

  constructor() {
    super();
    this.data = [];
    this.index = 0;
    this.isLoading = true;
    this.maxItems = 0;
    this.dataProvider = document.createElement('data-provider');
  }

  connectedCallback() {
    super.connectedCallback();

    this.addEventListener('next-card', this.nextCard);
    this.addEventListener('previous-card', this.previousCard);
    
    this.dataProvider.addEventListener('api-data-provider', (event) => {
        this.data = event.detail.data;
        this.maxItems = event.detail.maxItems;
        this.isLoading = false;
        this.dispatchEvent(new CustomEvent('loading-updated', { detail: this.isLoading }));
        this.requestUpdate();
    });

    this.dataProvider.connectedCallback();
  }

  nextCard(){
    this.index++;

    if(this.index > this.maxItems){
        this.index = 0;
    }

    this.updateCharacter(this.index);
  }

  previousCard(){
    this.index--;

    if(this.index < 0){
        this.index = this.maxItems;
    }

    this.updateCharacter(this.index);
  }

  updateCharacter(index = 0) {
    const character = this.data[index];
    this.dispatchEvent(new CustomEvent('fill-card', { detail: character }));
  }

}

customElements.define('data-manager', DataManager);