import {LitElement, html} from '@polymer/lit-element/lit-element.js';
import {render} from './node_modules/@polymer/lit-html';

import ViewBehavior from 'mig-view-router/view-behavior.js';
import '@polymer/polymer/lib/elements/dom-repeat.js';
import get from './xhrJsonGet.js';

export class ViewPosts extends ViewBehavior(LitElement) {
  _render({posts}) {
    return html`
    ${render(super._render(), this)}
      <h1>${this.viewTitle}</h1>
        ${posts && posts.map((item) => html`<p><a href="/${item.id}">${item.viewTitle}</a></p>`)}
      Also checkout the <a href="/about">about</a> page.
    `;
  }

  static get properties() {
    return Object.assign({}, super.properties, {
      posts: {
        type: Array,
        value: []
      }
    });
  }

  ready() {
    this.load().then(() => console.log('posts loaded'));
  }

  connectedCallback() {
    super.connectedCallback();
    this.viewTitle = 'Latest posts';
  }

  load() {
    return new Promise((resolve, reject) => {
      get('posts.json').then((response) => {
        this.posts = response.body;
        resolve();
      }, reject);
    });
  }
}

customElements.define('view-posts', ViewPosts);
