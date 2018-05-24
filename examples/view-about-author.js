import {LitElement, html} from '@polymer/lit-element/lit-element.js';
import {render} from './node_modules/lit-html';

import ViewBehavior from 'mig-view-router/view-behavior.js';
import get from './xhrJsonGet.js';

export class ViewAboutAuthor extends ViewBehavior(LitElement) {
  _render(props) {
    return html`
      ${render(super._render(), this)}
      <h1>${props.name}</h1>
      <p>${props.content}</p>
      <p><a href="/about">Show all authors</a></p>
    `;
  }

  static get properties() {
    return Object.assign({}, super.properties, {
      authorId: {
        type: String,
        reflectToAttribute: true
      },
      name: String,
      content: String
    });
  }

  load() {
    return new Promise((resolve, reject) => {
      get('authors.json').then((response) => {
        let matchingAuthor;

        response.body.forEach((author) => {
          if (author.id === this.authorId) {
            matchingAuthor = author;
          }
        });

        if (matchingAuthor) {
          this.viewTitle = `About ${matchingAuthor.name}`;
          this.name = matchingAuthor.name;
          this.content = matchingAuthor.content;
          resolve();
        } else {
          reject(new Error('Not found'));
        }
      }, reject);
    });
  }

  unload() {
    this.viewTitle = 'Loading author...';
    this.name = '';
    this.content = '';
  }
}

customElements.define('view-about-author', ViewAboutAuthor);
