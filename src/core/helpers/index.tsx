import {
  IBuiltInMark,
  IInlineStyle,
  IPortableBlock,
  IPortableInline,
} from "../types";

const renderPortableInline = (input: IPortableInline) => {
  console.log(input);

  const {
    _key,
    _style,
    _type,
    _attrs = {},
    _text = "",
    _children = [],
  } = input;
  if (_type !== "inline") {
    return null;
  }
  let elementType = "span";
  switch (_style) {
    case "span":
      elementType = "span";
      break;
    case "link":
      elementType = "a";
      break;

    case "bold":
      elementType = "strong";
      break;

    case "italic":
      elementType = "em";
      break;
    case "underline":
      elementType = "u";
      break;
    case "code":
      elementType = "code";
      break;
    case "line-through":
      elementType = "del";
      break;
  }

  const element = document.createElement(elementType);
  element.dataset.key = _key;
  element.dataset.style = _style;
  if (!_children.length) {
    element.innerText = _text;
  } else {
    _children.forEach((c) => {
      const n = renderPortableInline(c);
      n && element.append(n);
    });
  }
  Object.entries(_attrs).forEach(([k, v]) => {
    element.setAttribute(k, v);
  });

  return element;
};

const renderPortableBlock = (input: IPortableBlock) => {
  const {
    _key,
    _style,
    _type,
    _attrs = {},
    _marks = [],
    _children = [],
  } = input;
  if (_type !== "block") {
    return null;
  }
  let elementType = "p";
  switch (_style) {
    case "section":
      elementType = "section";
      break;

    case "heading1":
      elementType = "h1";
      break;

    case "heading2":
      elementType = "h2";
      break;

    case "heading3":
      elementType = "h3";
      break;

    case "heading4":
      elementType = "h4";
      break;

    case "heading5":
      elementType = "h5";
      break;

    case "heading6":
      elementType = "h6";
      break;

    case "paragraph":
      elementType = "p";
      break;
  }
  const element = document.createElement(elementType);
  element.dataset.key = _key;
  element.dataset.style = _style;
  Object.entries(_attrs).forEach(([k, v]) => {
    element.setAttribute(k, v);
  });
  _children?.forEach((c) => {
    const child =
      renderPortableBlock(c as IPortableBlock) ||
      renderPortableInline(c as IPortableInline<IInlineStyle>);

    if (child) {
      element.append(child);
    }
  });

  _marks.forEach((m) => {
    switch (m) {
      case IBuiltInMark.TextLeft:
        element.style.textAlign = "left";
        break;
      case IBuiltInMark.TextRight:
        element.style.textAlign = "right";
        break;
      case IBuiltInMark.TextCenter:
        element.style.textAlign = "center";
        break;
      case IBuiltInMark.TextJustify:
        element.style.textAlign = "justify";
        break;

      default:
        break;
    }
  });
  return element;
};

export const renderPortableArr = (input: IPortableBlock[]) => {
  return input.map((block) => {
    return renderPortableBlock(block);
  });
};
