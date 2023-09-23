import { LitElement, html } from 'https://cdn.jsdelivr.net/gh/lit/dist@2/core/lit-core.min.js';

class MiComponente extends LitElement {
    static get properties() {
        return {
            contador: { type: Number }
        };
    }

    constructor() {
        super();
        this.contador = 0;
        this.estadoInterno = 'Inicial';
    }

    render() {
        return html`
            <div>
                <p>Contador: ${this.contador}</p>
                <p>Estado interno: ${this.estadoInterno}</p>
                <button @click="${this.actualizarContador}">Incrementar contador</button>
            </div>
        `;
    }

    actualizarContador() {
        this.contador++;
        this.estadoInterno = 'Actualizado';
        this.requestUpdate();
    }

    stateChanged() {
        console.log('Estado interno ha cambiado');
    }
}

customElements.define('mi-componente', MiComponente);