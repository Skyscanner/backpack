# Inexact ...rest and TypeScript

## TL;DR

If using `...rest` parameter with the intention to allow any arbitrary prop to be passed then type using:

```tsx
type Props = {
  namedPropOne: string;
  namedPropTwo: boolean;
  [rest: string]: any; // Inexact rest. See decisions/inexact-rest.md
};
```

## Decision

Allow the use of the `any` type for deliberately arbitrary parameters but expect an inline reference so that developers think twice about the lack of protection `any` provides.

## Thinking

Our existing components commonly support adding arbitrary props that are spread on to the HTML below them. We even have a default test case for `should support arbitrary props`.

This is seen as recommended practice, but to support it we need to type the `...rest` parameter as `any`, or TypeScript will correctly flag up non-specified props as not being supported.

`any` types weaken our type safety, and often do so in a way invisible to consumers who are expecting exact types to safeguard them. As such it is considered best practice to avoid them.

Developers commonly reference existing code when writing new code, and so using `any` without an explanation can quickly propagate through a codebase. Similarly to if this was a TypeScript suppression adding an inline comment helps developers to think twice when writing code, and reviewers to think twice when reviewing code.

In our previous Flow typed code this was already suppressed with an inline comment referencing `decisions/flowfixme.md`.

## Anything else

If arbitrary props are not intended to be supported then use a more exact type. For example, if spreading on to a `div` use:

```tsx
type Props = {
  namedPropOne: string;
  namedPropTwo: boolean;
} & React.HTMLAttributes<HTMLDivElement>;
```

if then needing to override some of the built in type definitions do so by using `Omit`. In the example below React knows className can only be `string | undefined`, but we assert that it can also be `null` as in our use case we don't apply it directly to the `div`:

```tsx
type Props = {
  namedPropOne: string;
  namedPropTwo: boolean;
  className?: string | null;
} & Omit<React.HTMLAttributes<HTMLDivElement>, 'className'>;

const BpkComponent = ({ className = null, ...rest }: Props) => {
  const classNames = getClassName('some-default-class', className);

  return <div className={classNames} {...rest} />;
};
```
