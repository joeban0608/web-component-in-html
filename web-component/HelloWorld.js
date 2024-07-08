// web component
class HelloWorld extends HTMLElement {
  static observedAttributes = ["color", "size"];

  constructor() {
    // 必须首先调用 super 方法
    super();
  }
  // connect component
  connectedCallback() {
    this.textContent = "Hello World!";
  }
  attributeChangedCallback(name, oldValue, newValue) {
    console.log(`属性 ${name}, oldValue: ${oldValue}, newValue: ${newValue}`);
  }
}

// register component
customElements.define("hello-world", HelloWorld);
