import { LitElement, html, css } from 'https://cdn.jsdelivr.net/gh/lit/dist@2/core/lit-core.min.js';

class CardNavigator extends LitElement {

    static properties = {
        dataManager: { type: Object }
    };

    nextCard() {
        this.dataManager.dispatchEvent(new CustomEvent('next-card'));
    }

    previousCard() {
        this.dataManager.dispatchEvent(new CustomEvent('previous-card'));
    }

    render() {
        return html`
            <div class="buttons-container">
                <button @click="${this.previousCard}">Anterior</button>
                <button @click="${this.nextCard}">Siguiente</button>
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

customElements.define('card-navigator', CardNavigator);