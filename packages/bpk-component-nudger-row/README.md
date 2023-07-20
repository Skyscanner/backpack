# bpk-component-nudger-row

> Backpack nudger row component.

## Installation

Check the main [Readme](https://github.com/skyscanner/backpack#usage) for a complete installation guide.

## Usage

```js
import BpkNudgerRow from '@skyscanner/backpack-web/bpk-component-nudger-row';

export default () => (
    <BpkNudgerRow
        nudgerId="nudger"
        title="title"
        subtitle="subtitle"
        min={1}
        max={9}
        value={2}
        onChange={() => null}
        decreaseButtonLabel="Decrease"
        increaseButtonLabel="Increase"
    />
)
```

## Props

| Property            	| PropType 	| Required 	| Default Value 	|
|---------------------- |----------	|----------	|------------------ |
| title               	| string   	| true     	| -             	|
| nudgerId            	| string   	| true     	| -             	|
| value               	| number   	| true     	| -             	|
| decreaseButtonLabel 	| string   	| true     	| -             	|
| increaseButtonLabel 	| string   	| true     	| -             	|
| min                 	| number   	| true     	| -             	|
| max                 	| number   	| true     	| -             	|
| onChange            	| function 	| true     	| -             	|
| subtitle            	| string   	| false    	| undefined     	|
| className           	| string   	| false    	| null          	|
