/**
 * Copyright 2025 Firaol Tulu Firew
 * @license Apache-2.0, see LICENSE for full text.
 */
import { LitElement, html, css } from "lit";
import { DDDSuper } from "@haxtheweb/d-d-d/d-d-d.js";
import { I18NMixin } from "@haxtheweb/i18n-manager/lib/I18NMixin.js";

/**
 * `counter-app`
 * 
 * @demo index.html
 * @element counter-app
 */
export class counterApp extends DDDSuper(I18NMixin(LitElement)) {

  static get tag() {
    return "counter-app";
  }

  constructor() {
    super();
    this.title = "Counter App";
    this.min = 0;
    this.max = 50;
    this.count = 0;
    
    
    this.registerLocalization({
      context: this,
      localesPath:
        new URL("./locales/counter-app.ar.json", import.meta.url).href +
        "/../",
      locales: ["ar", "es", "hi", "zh"],
    });
  }
  
  add() {
        this.count++;
      }

  minus() {
      this.count--;
    }
  reset() {
    this.count = 0;
  }
    updated(changedProperties) {
      if (super.updated) {
        super.updated(changedProperties);
      }

      if (changedProperties.has('count')) {
        if (this.count === 21) {
          this.makeItRain();
      }
    }
  }
    
    makeItRain() {
      // this is called a dynamic import. It means it won't import the code for confetti until this method is called
      // the .then() syntax after is because dynamic imports return a Promise object. Meaning the then() code
      // will only run AFTER the code is imported and available to us
      import("@haxtheweb/multiple-choice/lib/confetti-container.js").then(
        (module) => {
          // This is a minor timing 'hack'. We know the code library above will import prior to this running
          // The "set timeout 0" means "wait 1 microtask and run it on the next cycle.
          // this "hack" ensures the element has had time to process in the DOM so that when we set popped
          // it's listening for changes so it can react
          setTimeout(() => {
            // forcibly set the poppped attribute on something with id confetti
            // while I've said in general NOT to do this, the confetti container element will reset this
            // after the animation runs so it's a simple way to generate the effect over and over again
            this.shadowRoot.querySelector("#confetti").setAttribute("popped", "");
          }, 0);
        }
      );
    }
  // Lit reactive properties
  static get properties() {
    return {
      ...super.properties,
      title: { type: String },
      count: { type: Number, reflect: true },
      min: { type: Number },
      max: { type: Number }
    };
  }

  // Lit scoped styles
  static get styles() {
    return [super.styles,
    css`
      :host {
        display: inline-block;
        color: var(--ddd-theme-primary);
        background-color: var(--ddd-theme-accent);
        font-family: var(--ddd-font-navigation);
        margin: 0.5em;
        vertical-align: top; 
      }
      .wrapper {
        background: white;
        padding: 2em;
        border-radius: var(--ddd-radius-md);
        box-shadow: var(--ddd-boxShadow-sm);
        text-align: center;
        max-width: 300px;
        width: 100%;
        color: var(--ddd-theme-default-alertUrgent);
        box-sizing: border-box; 
        vertical-align: top;
        overflow: auto;
        height: 300px;
      }
      h3 span {
        font-size: var(--counter-app-label-font-size, var(--ddd-font-size-s));
      }
      .buttons {
        display: flex;
        justify-content: center;
        gap: 1em;
        }
      button:hover, button:focus {
        background: #0055aa;
        background: var(--ddd-theme-default-gradient-buttons);

      }
      h4 {
        font-size: 4em;
        margin: 0.5em 0;
      }
      .number {
        font-size: 2em;
        margin: 0.5em 0;
        transition: color 0.3s ease;
        color: var(--ddd-theme-text);
      }
      .title {
        color: var(--ddd-theme-default-warning); 
        font-weight: var(--ddd-font-weight-bold);
        text-shadow: 0 0 8px var(--ddd-theme-default-alertUrgent);
      }
      :host([count="18"]) .number {
        color: var(--ddd-theme-default-alertUrgent);
        --glow-color: rgba(0, 0, 255, 0.9);
        --glow-blur: 10px;
        --glow-spread: 2px;
        text-shadow: 0 0 var(--glow-blur) var(--glow-color);
      }
      :host([count="21"]) .number {
        color: var(--ddd-theme-default-shrineLight);
        --glow-color: rgba(150, 0, 255, 0.9);
        --glow-blur: 10px;
        --glow-spread: 2px;
        text-shadow: 0 0 var(--glow-blur) var(--glow-color);
      }

      .at-min {
        color: var(--ddd-theme-default-original87Pink);
        font-weight: var(--ddd-font-weight-bold);
        text-shadow: 0 0 8px rgba(255, 0, 0, 0.7);
      }

      .at-max {
        color: var(--ddd-theme-default-globalNeon);
        font-weight: var(--ddd-font-weight-bold);
        text-shadow: 0 0 8px rgba(0, 255, 0, 0.7);
      }

    `];
  }

  // Lit render the HTML
  render() {
    return html`
<confetti-container id="confetti">
<div class="wrapper">
  <h3 class="title">${this.title}</h3>
  <h4 class="number">${this.count}</h4>
  <div class="buttons">
 <button @click="${this.minus}" ?disabled="${this.min === this.counter}">-</button><button @click="${this.reset}">Reset</button> <button @click="${this.add}" ?disabled="${this.min === this.counter}">+</button>
  </div>
  
  <slot></slot>
</div>
</confetti-container>`;
  }

  /**
   * haxProperties integration via file reference
   */
  static get haxProperties() {
    return new URL(`./lib/${this.tag}.haxProperties.json`, import.meta.url)
      .href;
  }
}

globalThis.customElements.define(counterApp.tag, counterApp);