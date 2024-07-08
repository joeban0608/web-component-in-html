function updateStyle(elem) {
  const size = elem.getAttribute("size");
  // console.log("elem", elem);
  const shadow = elem.shadowRoot;
  const imgDom = shadow.querySelector("img");
  imgDom.style.width = `${size}rem`;
  imgDom.style.height = `${size}rem`;
  // console.log('elem.getAttribute("size")', elem.getAttribute("size"));
  // shadow.querySelector("img").textContent = `
  // `;
}
// 为当这个元素创建一个类
class PopupInfo extends HTMLElement {
  static get observedAttributes() {
    return ["color", "size"];
  }

  constructor() {
    // 必须首先调用 super 方法
    super();
  }

  connectedCallback() {
    // 创建影子根
    const shadow = this.attachShadow({ mode: "open" });

    // 创建几个 span
    const wrapper = document.createElement("span");
    wrapper.setAttribute("class", "wrapper");

    const icon = document.createElement("span");
    icon.setAttribute("class", "icon");
    icon.setAttribute("tabindex", 0);

    const info = document.createElement("span");
    info.setAttribute("class", "info");

    // 获取属性内容然后将其放入 info 这个 span 内
    const text = this.getAttribute("data-text");
    info.textContent = text;

    // 插入图标
    let imgUrl;
    if (this.hasAttribute("img")) {
      imgUrl = this.getAttribute("img");
    } else {
      imgUrl = "img/default.png";
    }

    const img = document.createElement("img");
    img.src = imgUrl;
    icon.appendChild(img);

    // 创建一些 CSS 应用于影子 DOM
    const style = document.createElement("style");
    console.log(style.isConnected);

    style.textContent = `
      .wrapper {
        position: relative;
      }

      .info {
        font-size: 0.8rem;
        width: 200px;
        display: inline-block;
        border: 1px solid black;
        padding: 10px;
        background: white;
        border-radius: 10px;
        opacity: 0;
        transition: 0.6s all;
        position: absolute;
        bottom: 20px;
        left: 10px;
        z-index: 3;
      }

      img {
        width: 1.2rem;
      }

      .icon:hover + .info, .icon:focus + .info {
        opacity: 1;
      }
    `;

    // 将创建好的元素附加到影子 DOM 上
    shadow.appendChild(style);
    console.log(style.isConnected);
    shadow.appendChild(wrapper);
    wrapper.appendChild(icon);
    wrapper.appendChild(info);
    updateStyle(this);
  }
  attributeChangedCallback(property, oldValue, newValue) {
    if (oldValue === newValue) return;
    this[property] = newValue;
  }
}
customElements.define("popup-info", PopupInfo);
