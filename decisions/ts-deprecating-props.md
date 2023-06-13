# Deprecating props in TypeScript

## Decision

Use JSDoc `deprecated` tag and console warnings to indicate if a prop is deprecated.

## Thinking

JSDoc `deprecated` tags will highlight usages of deprecated props in most IDEs. In addition to this, we use console warnings to warn consumers at runtime.

## Example

```
    type MyCompProps = {
        stableProp: string;
        /** @deprecated deprecatedProp is deprecated. Use stableProp instead. */
        deprecatedProp: string;
    }
	const MyComp = ({ stableProp, deprecatedProp}) => {
			if (deprecatedProp) {
				// This will only run if deprecatedProp is passed by consumer as the default value should be null or undefined.
				console.warn('deprecatedProp is deprecated. Use stableProp instead.');
			}
			return ...
  }
```