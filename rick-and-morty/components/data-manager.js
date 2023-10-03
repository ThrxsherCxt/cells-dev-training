import { LitElement } from 'https://cdn.jsdelivr.net/gh/lit/dist@2/core/lit-core.min.js';

class DataManager extends LitElement {
  static get properties() {
    return {
      characters: { type: Array },
      index: { type: Number },
      direction: { type: String },
      totalItems: { type: Number }
    };
  }
  constructor() {
    super();
    this.characters = [];
    this.index = 0;
  }

  updated(changedProperties) {
    if (changedProperties.has('characters') && this.characters.length > 0) {
      this.showCharacter();
    }
  }

  handleDirection(event) {

    this.direction = event.detail;

    if (this.direction === 'next') {
      this.index++;

      if (this.index > (this.totalItems - 1)) {
        this.index = 0;
      }

    } else {
      this.index--;

      if (this.index < 0) {
        this.index = this.totalItems - 1;
      }
    }

    this.showCharacter();

  }

  showCharacter() {
    this.dispatchEvent(
      new CustomEvent(
        'update-character',
        {
          bubbles: true,
          composed: true,
          detail: this.characters[this.index]
        }
      )
    );
  }

}

customElements.define('data-manager', DataManager);
