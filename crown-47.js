/**
 * Copyright 2025 Firaol Tulu Firew
 * @license Apache-2.0, see LICENSE for full text.
 */
import { LitElement, html, css } from "lit";
import { DDDSuper } from "@haxtheweb/d-d-d/d-d-d.js";
import { I18NMixin } from "@haxtheweb/i18n-manager/lib/I18NMixin.js";

/**
 * `crown-47`
 * 
 * @demo index.html
 * @element crown-47
 */
export class Crown47 extends DDDSuper(I18NMixin(LitElement)) {

  static get tag() {
    return "crown-47";
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
        new URL("./locales/crown-47.ar.json", import.meta.url).href +
        "/../",
      locales: ["ar", "es", "hi", "zh"],
    });
  }
  
  add() {
        if (this.count < this.max) {
          this.count++;
        }
      }

  minus() {
      if (this.count > this.min) {
        this.count--;
      }
    }
  // Lit reactive properties
  static get properties() {
    return {
      ...super.properties,
      title: { type: String },
      count: { type: Number },
      min: { type: Number },
      max: { type: Number }
    };
  }

  // Lit scoped styles
  static get styles() {
    return [super.styles,
    css`
      :host {
        display: block;
        color: var(--ddd-theme-primary);
        background-color: var(--ddd-theme-accent);
        font-family: var(--ddd-font-navigation);
      }
      .wrapper {
        background: white;
        padding: 2em;
        border-radius: 12px;
        box-shadow: 0 4px 12px lightblue;
        text-align: center;
        max-width: 300px;
        width: 100%;
        color: navajowhite;
      }
      h3 span {
        font-size: var(--crown-47-label-font-size, var(--ddd-font-size-s));
      }
      .buttons {
        display: flex;
        justify-content: center;
        gap: 1em;
        }
        button:hover, button:focus {
        background: #0055aa;
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
      .eighteen {
        color: lightgoldenrodyellow;
        --glow-color: rgba(0, 0, 255, 0.9);
        --glow-blur: 10px;
        --glow-spread: 2px;
        text-shadow: 0 0 var(--glow-blur) var(--glow-color);
      }
      .twentyone {
        color: limegreen;
        --glow-color: rgba(150, 0, 255, 0.9);
        --glow-blur: 10px;
        --glow-spread: 2px;
        text-shadow: 0 0 var(--glow-blur) var(--glow-color);
      }

    `];
  }

  // Lit render the HTML
  render() {
    return html`
<div class="wrapper">
  <h3>${this.title}</h3>
  <h4 class="number ${this.count === 18 ? 'eighteen' : this.count === 21 ? 'twentyone' : ''}">${this.count}</h4>
  <div class="buttons">
 <button @click="${this.minus}" >-</button> <button @click="${this.add}">+</button>
  </div>
  
  <slot></slot>
</div>`;
  }

  /**
   * haxProperties integration via file reference
   */
  static get haxProperties() {
    return new URL(`./lib/${this.tag}.haxProperties.json`, import.meta.url)
      .href;
  }
}

globalThis.customElements.define(Crown47.tag, Crown47);