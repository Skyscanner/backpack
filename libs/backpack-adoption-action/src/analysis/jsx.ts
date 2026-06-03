import ts from "typescript";

const HTML_ELEMENTS = new Set([
  "a",
  "abbr",
  "address",
  "area",
  "article",
  "aside",
  "audio",
  "b",
  "base",
  "bdi",
  "bdo",
  "blockquote",
  "body",
  "br",
  "button",
  "canvas",
  "caption",
  "cite",
  "code",
  "col",
  "colgroup",
  "data",
  "datalist",
  "dd",
  "del",
  "details",
  "dfn",
  "dialog",
  "div",
  "dl",
  "dt",
  "em",
  "embed",
  "fieldset",
  "figcaption",
  "figure",
  "footer",
  "form",
  "h1",
  "h2",
  "h3",
  "h4",
  "h5",
  "h6",
  "head",
  "header",
  "hgroup",
  "hr",
  "html",
  "i",
  "iframe",
  "img",
  "input",
  "ins",
  "kbd",
  "label",
  "legend",
  "li",
  "link",
  "main",
  "map",
  "mark",
  "menu",
  "meta",
  "meter",
  "nav",
  "noscript",
  "object",
  "ol",
  "optgroup",
  "option",
  "output",
  "p",
  "param",
  "picture",
  "pre",
  "progress",
  "q",
  "rp",
  "rt",
  "ruby",
  "s",
  "samp",
  "script",
  "section",
  "select",
  "slot",
  "small",
  "source",
  "span",
  "strong",
  "style",
  "sub",
  "summary",
  "sup",
  "svg",
  "table",
  "tbody",
  "td",
  "template",
  "textarea",
  "tfoot",
  "th",
  "thead",
  "time",
  "title",
  "tr",
  "track",
  "u",
  "ul",
  "var",
  "video",
  "wbr",
]);

const NON_VISUAL_REACT_COMPONENTS = new Set([
  "Fragment",
  "StrictMode",
  "Suspense",
  "Profiler",
  "Portal",
]);

export const sourceFileFor = (filePath: string, content: string) => {
  const scriptKind = filePath.endsWith(".tsx")
    ? ts.ScriptKind.TSX
    : ts.ScriptKind.JSX;

  return ts.createSourceFile(
    filePath,
    content,
    ts.ScriptTarget.Latest,
    true,
    scriptKind,
  );
};

export const isBackpackComponent = (componentName: string | null) =>
  !!componentName && componentName.startsWith("Bpk");

export const isRawHtmlElement = (elementName: string | null) =>
  !!elementName &&
  elementName === elementName.toLowerCase() &&
  HTML_ELEMENTS.has(elementName);

export const isNonBackpackComponent = (componentName: string | null) =>
  !!componentName &&
  /^[A-Z][a-zA-Z0-9]*$/.test(componentName) &&
  !isBackpackComponent(componentName) &&
  !isRawHtmlElement(componentName);

export const tagNameText = (name: ts.JsxTagNameExpression): string | null => {
  if (ts.isIdentifier(name)) {
    return name.text;
  }

  if (ts.isPropertyAccessExpression(name)) {
    const left = tagNameText(name.expression as ts.JsxTagNameExpression);
    return left ? `${left}.${name.name.text}` : name.name.text;
  }

  if (ts.isJsxNamespacedName(name)) {
    return `${name.namespace.text}:${name.name.text}`;
  }

  return null;
};

export const lastMemberName = (elementName: string) => {
  const segments = elementName.split(".");
  return segments[segments.length - 1];
};

export const firstMemberName = (elementName: string) => elementName.split(".")[0];

export const isNonVisualReactComponentName = (componentName: string) =>
  NON_VISUAL_REACT_COMPONENTS.has(componentName);

export const isNonVisualComponent = (
  elementName: string,
  nonVisualImports: Set<string>,
) => {
  if (nonVisualImports.has(elementName)) {
    return true;
  }

  if (!elementName.includes(".")) {
    return false;
  }

  const owner = firstMemberName(elementName);
  const property = lastMemberName(elementName);

  return (
    property === "Provider" ||
    (owner === "React" && NON_VISUAL_REACT_COMPONENTS.has(property))
  );
};

export const expressionName = (expression: ts.Expression): string | null => {
  if (ts.isIdentifier(expression)) {
    return expression.text;
  }

  if (ts.isPropertyAccessExpression(expression)) {
    return expression.name.text;
  }

  return null;
};

export const stringFromExpression = (expression: ts.Expression): string | null => {
  if (ts.isStringLiteral(expression) || ts.isNoSubstitutionTemplateLiteral(expression)) {
    return expression.text;
  }

  if (ts.isTemplateExpression(expression)) {
    return [
      expression.head.text,
      ...expression.templateSpans.map((span) => span.literal.text),
    ]
      .filter((part) => part.trim())
      .join("...");
  }

  return null;
};
