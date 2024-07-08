// web component
class HelloWorld extends HTMLElement {
  constructor() {
    // 必须首先调用 super 方法
    super();
  }
  // connect component
  connectedCallback() {
    this.textContent = "Hello World!";
  }
}

// register component
customElements.define("hello-world", HelloWorld);
