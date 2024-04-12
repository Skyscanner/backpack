### Avoid className props

Never provide any prop that takes in a CSS style to a React component. These
props are typically called `className` but it is not the _name_ that matters, but that it is passing in a style directly.

```tsx
<MyComponent className={STYLES.someStyle} />
```

Using the base HTML `className` prop on lower level HTML elements is allowed.

```tsx
<div className={STYLES.someStyle} />
```

### Composition

For adding spacing around a component, such as `margin`, compose the component by using dividing elements.

```tsx
<div className={STYLES.wide}>
  <MyComponent />
</div>
```

### Configuration

For changing the styling within an element, such as changing its colour, provide one or more props that allow the consumer to do so explicitly.

```tsx
<MyComponent theme={THEMES.DARK} />
```

<details>
<summary>Why className usage can cause specificity problems</summary>

In CSS when two selectors are of equal specificity it is the last style in the stylesheet that overrides the other. For example, given the below:

```tsx
.blue {
    color: blue;
}

.green {
    color: green;
}

<h1 class="green blue">What color is this text?</h1>
```

The text would be green. Each uses a class selector, so neither is more specific, but `.green` is last in the stylesheet (last in the cascade).

In the below component a base style, `base`, is applied, and then any additional style can be added via the `className` prop. If both had the same specificity then it is the last one added to the stylesheet that will be able to override the other.

```tsx
const MyComponent = ({ className }) => {
  return <button className={classNames(STYLES.base, className)} />;
};
```

In a non-code split app the order that styles are added to the stylesheet is simple, and deterministic. `import` statement order determines the order styles are added, and when running locally the stylesheet will be in the same order as production.

In a code-split app the order styles are added to the stylesheet depends on the order chunks are loaded, which depends which pages a user visits and in which order. For example, if the homepage and results page are in separate chunks, then the order of the stylesheet will vary depending on which page the user lands on first. When the second page is navigated to and its CSS downloaded it will be appended to the bottom of the stylesheet. This behaviour is not seen when running locally against a development build, as locally all JS/CSS is kept in a single bundle.

This causes problems if a component is used in multiple pages, and in at least one of those its styles are overridden by an equal-specificity selector. When navigating between pages the below can end up as the order in the stylesheet:

```tsx
const MyComponent = ({ className }) => {
  return <button className={classNames(STYLES.base, className)} />
}

// Page One
<MyComponent className={STYLES.overrideClassName} />

// Page Two
<MyComponent />
```

```scss
.base {
} // Appended to the bottom when navigating to page two

.overrideClassName {
}

.base {
} // Appended to the bottom when navigating to page two
```

This new stylesheet is applied when visiting the initial page again, suddenly meaning the component on that page no longer has the override as expected.

This may initially render as expected. However, when a new page is navigated to the base CSS will be downloaded again, and its place at the end of the stylesheet mean that the first instance of the component will no longer have its override applied.

Specificity of the `overrideClassName` could be applied to work around this, but this quickly enters 'specificity wars' as multiple overrides in different places compete with each other.

A safe, reliable, and future proof solution is simply not to allow classes to be passed in as props. Instead composition and configuration, as described above, can be used to theme a component. This has the added benefit of meaning that by looking at any base component you can see all the possible ways it may be being used in your app, as they all exist as props.
