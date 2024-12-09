class MyCustomElement extends HTMLElement {
    constructor() {
      super();
      this.attachShadow({ mode: 'open' });
      this.shadowRoot.innerHTML = `
        <style>
          p {
            color: blue;
          }
        </style>
        <p>Hola, soy un Web Component!</p>
        <button>Haz clic aquí</button>
      `;
      this.button = this.shadowRoot.querySelector('button');
    }
  
    connectedCallback() {
      this.button.addEventListener('click', this.handleClick.bind(this));
    }
  
    disconnectedCallback() {
      this.button.removeEventListener('click', this.handleClick.bind(this));
    }
  
    handleClick() {
      const event = new CustomEvent('customEvent', {
        detail: { message: 'Botón clickeado!' },
        bubbles: true,
        composed: true,
      });
      this.dispatchEvent(event);
    }
  
    static get observedAttributes() {
      return ['message'];
    }
  
    attributeChangedCallback(name, oldValue, newValue) {
      if (name === 'message' && oldValue !== newValue) {
        this.shadowRoot.querySelector('p').textContent = newValue;
      }
    }
  }
  
  customElements.define('my-custom-element', MyCustomElement);